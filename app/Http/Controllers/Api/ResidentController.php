<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Resident;
use App\Models\BerkasKk;
use App\Models\BerkasKtp;
use App\Models\ResidentPdf;
use App\Models\StatusForm;
use App\Models\TransactionStatusForm;
use Barryvdh\DomPDF\Facade\Pdf; // Pastikan Anda sudah mengimpor library PDF yang digunakan
use Illuminate\Support\Str;
use App\Http\Resources\ResidentResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage; 
use Illuminate\Support\Facades\Log; 

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
             return new ResidentResource($Residents);
            
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
        'nik'                       => 'required|size:16',
        'username'                  => 'required',
        'tempat_lahir'              => 'required',
        'tanggal_lahir'             => 'required|date',
        'genders_custom_id'         => 'required|exists:genders,custom_id',
        'status_nikah_custom_id'    => 'required|exists:status_nikahs,custom_id',
        'religions_custom_id'       => 'required|exists:religions,custom_id',
        'education_custom_id'       => 'required|exists:education,custom_id',
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

             $berkasKk = BerkasKk::create([
                    'nik' => $resident->nik,
                    'file_name' => $kkFile->getClientOriginalName(),
                    'file_path' => $kkPath,
                    'file_url' => Storage::url($kkPath),
                ]);
            }

             // Simpan berkas KTP
            if ($request->hasFile('berkas_ktp')) {
                $ktpFile = $request->file('berkas_ktp');
                $ktpPath = $ktpFile->store('berkas_ktp', 'public');
                        // Dapatkan URL publik file
                $fileUrl = Storage::url($ktpPath);
              
               $berkasKtp = BerkasKtp::create([
                    'nik' => $resident->nik,
                    'file_name' => $ktpFile->getClientOriginalName(),
                    'file_path' => $ktpPath,
                    'file_url' => $fileUrl, // Menggunakan Storage::url untuk mendapatkan URL yang benar
                ]);
            }
            // Load relasi untuk response
            $resident->load('berkasKk', 'berkasKtp');

               // Generate custom ID
             $customId = ResidentPdf::generateCustomId();

             // Generate PDF
            $pdf = Pdf::loadView('pdf.resident', ['resident' => $resident, 'customId' => $customId]);

            // Buat nama file unik
            $uniqueFileName = 'resident_' . $resident->nik . '_' . Str::random(10) . '.pdf';
            $path = 'pdfs/' . $uniqueFileName;

            // Simpan PDF ke storage
            Storage::disk('public')->put($path, $pdf->output());

            // Dapatkan URL lengkap
            $pdfUrl = url('storage/' . $path);
    
            // Simpan informasi PDF ke database
            $residentPdf = ResidentPdf::create([
                'nik' => $resident->nik,
                'custom_id' => $customId,
                'file_name' => $uniqueFileName,
                'file_path' => $path,
                'file_url' => $pdfUrl
            ]);

          // Cek keberadaan status form
        $statusForm = StatusForm::where('custom_id', 'ISF001')->first();

        // Jika status form tidak ditemukan, lempar exception
        if (!$statusForm) {
            throw new \Exception('Status form tidak ditemukan');
        }
        
            $transactioncustomid = TransactionStatusForm::generateCustomId();

        // Buat entri di TransactionStatusForm
        $transactionStatus = TransactionStatusForm::create([
            'custom_id' => $transactioncustomid, // Gunakan custom_id dari generate
            'form_custom_id' => $residentPdf->custom_id, // Gunakan custom_id dari ResidentPdf
            'statusForm_custom_id' => $statusForm->custom_id, // Gunakan custom_id dari StatusForm
        ]);

        // Logging untuk memastikan data tersimpan dengan benar
        \Log::info('Transaction Status Created', [
            'resident_nik' => $resident->nik,
            'form_custom_id' => $transactionStatus->form_custom_id,
            'status_form_custom_id' => $transactionStatus->statusForm_custom_id
        ]);

        // Load relasi yang diperlukan
        $resident->load(
            'berkasKk', 
            'berkasKtp', 
            'residentPdf', 
            'transactionStatusForm.statusForm'
        );

        return new ResidentResource($resident);
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
        $Resident = Resident::with(['BerkasKk','BerkasKtp','residentPdf'])->where('nik',$nik)->first();

        // Periksa apakah pengguna ditemukan
        if (!$Resident) {
            return response()->json(['message' => 'Resident  not found'], 404);
        }

        // Kembalikan pengguna sebagai resource
        return new ResidentResource($Resident);
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

//fungsi terpisah

    // Tambahan method untuk validasi berkas
protected function validateFile($file, $maxSize = 5120, $allowedMimes = ['pdf', 'jpg', 'png'])
{
    // Validasi ukuran file
    if ($file->getSize() > $maxSize * 1024) {
        throw new \Exception("Ukuran file melebihi batas maksimal {$maxSize}KB");
    }

    // Validasi tipe file
    $extension = strtolower($file->getClientOriginalExtension());
    if (!in_array($extension, $allowedMimes)) {
        throw new \Exception('Tipe file tidak valid. Gunakan: ' . implode(', ', $allowedMimes));
    }

    return true;
}

// Method untuk membersihkan file yang sudah diunggah jika terjadi error
protected function cleanupUploadedFiles($resident)
{
    // Hapus berkas KK jika ada
    $berkasKk = BerkasKk::where('nik', $resident->nik)->first();
    if ($berkasKk && Storage::disk('public')->exists($berkasKk->file_path)) {
        Storage::disk('public')->delete($berkasKk->file_path);
        $berkasKk->delete();
    }

    // Hapus berkas KTP jika ada
    $berkasKtp = BerkasKtp::where('nik', $resident->nik)->first();
    if ($berkasKtp && Storage::disk('public')->exists($berkasKtp->file_path)) {
        Storage::disk('public')->delete($berkasKtp->file_path);
        $berkasKtp->delete();
    }

    // Hapus PDF jika ada
    $residentPdf = ResidentPdf::where('nik', $resident->nik)->first();
    if ($residentPdf && Storage::disk('public')->exists($residentPdf->file_path)) {
        Storage::disk('public')->delete($residentPdf->file_path);
        $residentPdf->delete();
    }

    // Hapus data resident
    $resident->delete();
}
}

