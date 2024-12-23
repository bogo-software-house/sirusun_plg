<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use App\Models\Resident;
use App\Models\TransactionStatusForm;
use App\Models\ResidentPdf;
use App\Models\StatusForm;
use App\Models\User;
use App\Models\Role;
use App\Http\Resources\TransactionStatusFormResource;


class TransactionStatusFormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

 
    public function show(string $id)
    {
        //
    }

   
    public function update(Request $request, string $formcustomId)
    {
            $validator = Validator::make($request->all(), [
            'statusForm_custom_id' => 'required|exists:status_forms,custom_id',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }  

        DB::beginTransaction();
        try {
            // Temukan transaksi berdasarkan form custom ID
            $transaction = TransactionStatusForm::with(['residentPdf', 'statusForm'])
                ->where('form_custom_id', $formcustomId)
                ->firstOrFail();

            // Validasi relasi
            if (!$transaction->residentPdf) {
                throw new \Exception('Resident PDF not found');
            }

            // Ambil NIK dari resident PDF
            $nik = $transaction->residentPdf->nik;

            // Ambil data resident berdasarkan NIK
            $resident = Resident::where('nik', $nik)->first();
            
            // Validasi resident
            if (!$resident) {
                throw new \Exception('Resident not found');
            }

            // Update status form
            $transaction->update([
                'statusForm_custom_id' => $request->input('statusForm_custom_id')
            ]); 

            // Cek apakah status form adalah ISF002
            if ($request->input('statusForm_custom_id') === 'ISF002') {
                // Cek apakah user sudah ada
                $existingUser = User::where('username', $resident->username)->first();
                
                if (!$existingUser) {
                   //mencari di table role
                   $role = Role::where('leveluser', 'user')->first();
                   
                    // Generate custom ID untuk user
                    $usercustomId = User::generateCustomId();

                    // Buat user baru
                    $user = User::create([
                        'custom_id' => $usercustomId,
                        'username' => $resident->username,
                        'password' => Hash::make('user123'), // Gunakan Hash untuk password
                        'transaksi_custom_id' => $transaction->custom_id,
                        'roles_custom_id' => $role->custom_id,
                    ]); 
                }
            }

            // Commit transaksi
            DB::commit();

            // Reload transaksi untuk memastikan data terbaru
            $transaction->refresh();

            // Kembalikan pengguna sebagai resource
            return new TransactionStatusFormResource($transaction);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Transaction not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating transaction',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
