<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Resident;
use App\Models\BerkasKk;
use App\Models\BerkasKtp;
use App\Http\Resources\ResidentResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ResidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

           try {
            // Eager loading
             $Residents = Resident::Latest()->with(['religions','genders','StatusNikah','education','BerkasKk','BerkasKtp'])->get();
             return new ResidentResource(true, 'List Data residents', $Residents);
            
        } catch (\Exception $e) {
            Log::error('Error fetching residents: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Error fetching residents data',
                'error' => $e->getMessage()
            ], 500);
        }
        //     
  
    }

    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
          // Define validation rules
    $validator = Validator::make($request->all(), [
        'nik'                       => 'required|size:16|unique:users,nik', // Pastikan NIK unik
        'username'                  => 'required',
        'tempat_lahir'              => 'required',
        'tanggal_lahir'             => 'required|date',
        'genders_custom_id'         => 'required|exists:genders,custom_id', // Pastikan foreign key valid
        'status_nikah_custom_id'    => 'required|exists:status_nikahs,custom_id', // Pastikan foreign key valid
        'religions_custom_id'       => 'required|exists:religions,custom_id', // Pastikan foreign key valid
        'education_custom_id'       => 'required|exists:education,custom_id', // Pastikan foreign key valid
        'alamat_rumah'              => 'required',
        'no_telp'                   => 'required|numeric',
        'penghasilan'               => 'required|numeric',
        'warga_negara'              => 'required',
        'pekerjaan'                 => 'required',
        'alamat_tempat_kerja'       => 'required',
        'berkas_kk'                 => 'required|file|mimes:pdf,jpg,png',
        'berkas_ktp'                => 'required|file|mimes:pdf,jpg,png',
       
    ]);

    // Check if validation fails
    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

   
    try {
        // Gunakan database transaction untuk menjamin konsistensi data
        return DB::transaction(function () use ($request) {
            // Buat Resident
            $resident = Resident::create([
                'nik' => $request->nik,
                'username' => $request->username,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'genders_custom_id' => $request->genders_custom_id,
                'status_nikah_custom_id' => $request->status_nikah_custom_id,
                'religions_custom_id' => $request->religions_custom_id,
                'education_custom_id' => $request->education_custom_id,
                'alamat_rumah' => $request->alamat_rumah,
                'no_telp' => $request->no_telp,
                'penghasilan' => $request->penghasilan,
                'warga_negara' => $request->warga_negara,
                'pekerjaan' => $request->pekerjaan,
                'alamat_tempat_kerja' => $request->alamat_tempat_kerja,
            ]);

            // Simpan berkas KK
            if ($request->hasFile('berkas_kk')) {
                $kkFile = $request->file('berkas_kk');
                $kkPath = $kkFile->store('berkas_kk', 'public');
                
                BerkasKk::create([
                    'nik' => $resident->nik,
                    'file_path' => $kkPath,
                ]);
            }

            // Simpan berkas KTP
            if ($request->hasFile('berkas_ktp')) {
                $ktpFile = $request->file('berkas_ktp');
                $ktpPath = $ktpFile->store('berkas_ktp', 'public');
                
                BerkasKtp::create([
                    'nik' => $resident->nik,
                    'file_path' => $ktpPath,
                ]);
            }

            // Load relasi untuk response
            $resident->load('berkasKk', 'berkasKtp');

            // Return response dengan ResidentResource
            return new ResidentResource(true,'data resident masuk!',$resident);
        });
    } catch (\Exception $e) {
        // Tangani error yang mungkin terjadi
        return response()->json([
            'success' => false,
            'message' => 'Gagal menambahkan resident',
            'error' => $e->getMessage()
        ], 500);
    }
}


     /**
     * Display the specified resource.
     */
    public function show(string $nik)
    {
         // Temukan pengguna berdasarkan NIK
        $Resident = Resident::with(['BerkasKk','BerkasKtp'])->where('nik',$nik)->first();

        // Periksa apakah pengguna ditemukan
        if (!$Resident) {
            return response()->json(['message' => 'Resident  not found'], 404);
        }

        // Kembalikan pengguna sebagai resource
        return new ResidentResource(true, 'Detail Data Resident!', $Resident);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $nik)
    {
           // Temukan pengguna berdasarkan NIK
        $user = User::where('nik',$nik)->first();

        //delete post
        $user->delete();

        //return response
        return new UserResource(true, 'Data User Berhasil Dihapus!', null);
    }
}
