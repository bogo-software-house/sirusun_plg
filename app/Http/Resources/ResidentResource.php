<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\BerkaskkResource;
use App\Http\Resources\BerkasktpResource;
use App\Http\Resources\ResidentPdfResource;

class ResidentResource extends JsonResource
{
    // Tambahkan properti untuk status dan pesan
    protected $status = true;
    protected $message = 'Data berhasil diambil';

    // Constructor untuk mengatur status dan pesan kustom
    public function __construct($resource, $status = true, $message = 'Data berhasil diambil')
    {
        parent::__construct($resource);
        $this->status = $status;
        $this->message = $message;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
      // Periksa apakah resource adalah model atau collection
    if ($this->resource instanceof \Illuminate\Database\Eloquent\Model) {
        return $this->processModel();
    } elseif (is_iterable($this->resource)) { // Memastikan resource adalah iterable
        return [
            'success'   => $this->status,
            'message'   => $this->message,
            'data'      => $this->resource->map(function ($item) {
                return [
                    'id' => $item->id ?? null,
                    'nik' => $item->nik ?? null,
                    'username' => $item->username ?? null,
                    'tempat_lahir' => $item->tempat_lahir ?? null,
                    'tanggal_lahir' => $item->tanggal_lahir ?? null,
                    'genders_custom_id' => $item->genders_custom_id ?? null,
                    'status_nikah_custom_id' => $item->status_nikah_custom_id ?? null,
                    'religions_custom_id' => $item->religions_custom_id ?? null,
                    'education_custom_id' => $item->education_custom_id ?? null,
                    'alamat_rumah' => $item->alamat_rumah ?? null,
                    'no_telp' => $item->no_telp ?? null,
                    'penghasilan' => $item->penghasilan ?? null,
                    'warga_negara' => $item->warga_negara ?? null,
                    'pekerjaan' => $item->pekerjaan ?? null,
                    'alamat_tempat_kerja' => $item->alamat_tempat_kerja ?? null,
                    
                    // Gunakan metode baru untuk mengecek relasi
                    'berkas_kk' => $this->whenLoaded('berkasKk', function () use ($item) {
                        return $item->berkasKk ? new BerkaskkResource($item->berkasKk) : null;
                    }),
                    'berkas_ktp' => $this->whenLoaded('berkasKtp', function () use ($item) {
                        return $item->berkasKtp ? new BerkasktpResource($item->berkasKtp) : null;
                    }),
                    'resident_pdf' => $this->whenLoaded('residentPdf', function () use ($item) {
                        return $item->residentPdf ? new ResidentPdfResource($item->residentPdf) : null;
                    }),
                ];
            })
        ];
    }

    // Jika resource tidak valid
    return [
        'success' => false,
        'message' => 'Data tidak ditemukan',
        'data' => ['resource tidak valid']
    ];
    }

    /**
     * Proses untuk model individual
     */
    protected function processModel()
    {
        return [
            'success'   => $this->status,
            'message'   => $this->message,
            'data'      => [
                'nik' => $this->nik ?? null,
                'username' => $this->username ?? null,
                'tempat_lahir' => $this->tempat_lahir ?? null,
                'tanggal_lahir' => $this->tanggal_lahir ?? null,
                'genders_custom_id' => $this->genders_custom_id ?? null,
                'status_nikah_custom_id' => $this->status_nikah_custom_id ?? null,
                'religions_custom_id' => $this->religions_custom_id ?? null,
                'education_custom_id' => $this->education_custom_id ?? null,
                'alamat_rumah' => $this->alamat_rumah ?? null,
                'no_telp' => $this->no_telp ?? null,
                'penghasilan' => $this->penghasilan ?? null,
                'warga_negara' => $this->warga_negara ?? null,
                'pekerjaan' => $this->pekerjaan ?? null,
                'alamat_tempat_kerja' => $this->alamat_tempat_kerja ?? null,
                
                // Gunakan whenLoaded untuk relasi
                'berkas_kk' => $this->whenLoaded('berkasKk', function () {
                    return $this->berkasKk ? new BerkaskkResource($this->berkasKk) : null;
                }),
                'berkas_ktp' => $this->whenLoaded('berkasKtp', function () {
                    return $this->berkasKtp ? new BerkasktpResource($this->berkasKtp) : null;
                }),
                'resident_pdf' => $this->whenLoaded('residentPdf', function () {
                    return $this->residentPdf ? new ResidentPdfResource($this->residentPdf) : null;
                }),
            ]
        ];
    }

    /**
     * Metode untuk mengatur status kustom
     */
    public function withStatus($status)
    {
        $this->status = $status;
        return $this;
    }

    /**
     * Metode untuk mengatur pesan kustom
     */
    public function withMessage($message)
    {
        $this->message = $message;
        return $this;
    }
}