<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\TransactionHistory;
use App\Models\Resident;
use App\Models\TransactionStatusForm;
use App\Models\ResidentPdf;
use App\Models\StatusForm;
use App\Models\User;
use App\Models\Role;
use App\Models\Room;
use App\Mail\TransactionStatusNotificationMail;
use App\Jobs\DeleteTransactionStatusFormData;
use App\Http\Resources\TransactionStatusFormResource;
use App\Http\Resources\TransactionStatusFormShowResource;


class TransactionStatusFormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
       public function index()
    {
          $TransactionStatusForm = TransactionStatusForm::with(['residentPdf.resident','statusForm'])->Latest()->get();
        return  TransactionStatusFormResource::collection($TransactionStatusForm);
    }

 
    public function show(string $formcustomId)
    {
        $TransactionStatusForm = TransactionStatusForm::with(['residentPdf.resident','statusForm'])
        ->whereHas('residentPdf', function ($query) use ($formcustomId) {
        $query->where('nik', $formcustomId);
        })->Latest()->get();

            
        return  TransactionStatusFormShowResource::collection($TransactionStatusForm);
    }

   
    public function update(Request $request, string $formcustomId)
    {
        $validator = Validator::make($request->all(), [
            'statusForm_custom_id' => 'required|exists:status_forms,custom_id',
            'keterangan'           => 'nullable', // Keterangan bisa null
        ]);

        // Tambahkan logika kondisional untuk keterangan
        $validator->after(function ($validator) use ($request) {
            if ($request->input('statusForm_custom_id') === 'ISF002' && !is_null($request->input('keterangan'))) {
                $validator->errors()->add('keterangan', 'Keterangan harus kosong jika statusForm_custom_id adalah ISF002.');
            }

            if ($request->input('statusForm_custom_id') === 'ISF003' && empty($request->input('keterangan'))) {
                $validator->errors()->add('keterangan', 'Keterangan harus diisi jika statusForm_custom_id adalah ISF003.');
            }
        });
        // Cek jika validasi gagal
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }  

        DB::beginTransaction();
        try {
                // Temukan transaksi berdasarkan form custom ID
                $transaction = TransactionStatusForm::with(['residentPdf', 'statusForm'])
                    ->where('form_custom_id', $formcustomId)
                    ->firstOrFail();

                 // Simpan data lama sebelum update
                $oldTransactionData = [
                    'form_custom_id' => $transaction->form_custom_id,
                    'statusForm_custom_id' => $transaction->statusForm_custom_id,
                    'keterangan' => $transaction->keterangan,
                    'status' => $transaction->statusForm->status // Ambil status lama
                ];
            
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

                // Cek apakah status form adalah ISF002
                if ($request->input('statusForm_custom_id') === 'ISF002') {

                    
                    // Update status form
                $transaction->update([
                    'statusForm_custom_id' => $request->input('statusForm_custom_id'),
                    'keterangan'           => 'silahkan datang dan melihat tunggu 7 hari'
                ]); 

                // Refresh data setelah update
                $transaction->refresh();
                
                // Data baru setelah update
                $newTransactionData = [
                    'form_custom_id' => $transaction->form_custom_id,
                    'statusForm_custom_id' => $transaction->statusForm_custom_id,
                    'keterangan' => $transaction->keterangan,
                    'status' => $transaction->statusForm->status // Ambil status baru
                ];

                // Log history dengan data yang benar
                TransactionHistory::createHistory(
                    TransactionStatusForm::class,
                    $formcustomId,
                    'status_accepted',
                    $oldTransactionData,
                    $newTransactionData
                );



                
                $token = null;
                // Cek apakah user sudah ada
                $existingUser = User::where('nik', $resident->nik)->first();
                
                if (!$existingUser) {
                    // mencari di table role
                    $role = Role::where('leveluser', 'user')->first();
                    
                    // Generate custom ID untuk user
                    $usercustomId = User::generateCustomId();

                        // Buat user baru
                        $user = User::create([
                            'custom_id' => $usercustomId,
                            'nik'       => $resident->nik,
                            'username'  => $resident->username,
                            'password'  => Hash::make('user123'), // Gunakan Hash untuk password
                            'transaksi_custom_id' => $transaction->custom_id,
                            'roles_custom_id' => $role->custom_id,
                        ]); 
                        
                    // Buat token untuk user
                    $token = $user->createToken('auth_token')->plainTextToken;

                     // Log user creation history
                    TransactionHistory::createHistory(
                        User::class, 
                        $usercustomId, 
                        'created', 
                        null, 
                        $user->toArray()
                    );
                    
                        }else  {
                        // Jika user sudah ada, buat token baru
                        $token = $existingUser->createToken('auth_token')->plainTextToken;
                       }   


                    // Kirim email notifikasi untuk ISF002
                    if ($resident->email) {
                        Mail::to($resident->email)->send(
                            new TransactionStatusNotificationMail(
                                'DITERIMA', 
                                $resident, 
                                'silahkan datang dan melihat tunggu 7 hari'
                            )
                        );
                    }
                    
                }else if ($request->input('statusForm_custom_id') === 'ISF003') {
                    
                    $transaction->update([
                            'statusForm_custom_id' => $request->input('statusForm_custom_id'),
                            'keterangan' => $request->input('keterangan'),
                        ]);

                            // Refresh data setelah update
                    $transaction->refresh();
                    
                    // Data baru setelah update
                    $newTransactionData = [
                        'form_custom_id' => $transaction->form_custom_id,
                        'statusForm_custom_id' => $transaction->statusForm_custom_id,
                        'keterangan' => $transaction->keterangan,
                        'status' => $transaction->statusForm->status // Ambil status baru
                    ];

                    // Log history dengan data yang benar
                    TransactionHistory::createHistory(
                        TransactionStatusForm::class,
                        $formcustomId,
                        'status_accepted',
                        $oldTransactionData,
                        $newTransactionData
                    );

                        
                                // Kirim email notifikasi untuk ISF003
                    if ($resident->email) {
                        Mail::to($resident->email)->send(
                            new TransactionStatusNotificationMail(
                                'DITOLAK', 
                                $resident, 
                                $request->input('keterangan')
                            )
                        );
                    }

                        // Dispatch job untuk menghapus transaksi setelah 1 jam
                        DeleteTransactionStatusFormData::dispatch($transaction->id)->delay(now()->addMinute());
                    }
                


                // Commit transaksi
                DB::commit();

                // Reload transaksi untuk memastikan data terbaru
                $transaction->refresh();

                return response()->json([
                    'transaction' => new TransactionStatusFormResource($transaction),
                    'token' => $token ?? null,
                    'message' => 'Transaction status updated successfully',
                    'email' => 'terkirim! ke ' . $resident->email,

                ]);

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

        public function getStatistics()
    {
        try {
            // Total pendaftar (semua status)
            $totalPendaftar = TransactionStatusForm::count();

            // Total yang disetujui (ISF002)
            $totalDisetujui = TransactionStatusForm::where('statusForm_custom_id', 'ISF002')->count();

            // Total yang ditolak (ISF003)
            $totalDitolak = TransactionStatusForm::where('statusForm_custom_id', 'ISF003')->count();

            // Total yang masih dalam proses (ISF001)
            $totalProses = TransactionStatusForm::where('statusForm_custom_id', 'ISF001')->count();

            //total kamar yang masih tersedia
            $totalKamarTersedia = Room::where('statuses_custom_id','IST001')->count();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'total_pendaftar' => $totalPendaftar,
                    'total_disetujui' => $totalDisetujui,
                    'total_ditolak' => $totalDitolak,
                    'total_proses' => $totalProses,
                    'total_kamar' => $totalKamarTersedia
                ],
                'message' => 'Statistics retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
