<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\BerkaskkResource;
use App\Http\Resources\BerkasktpResource;

class ResidentResource extends JsonResource
{
    //define properti
    public $status;
    public $message;
    public $resource;

    /**
     * __construct
     *
     * @param  mixed $status
     * @param  mixed $message
     * @param  mixed $resource
     * @return void
     */
    public function __construct($status, $message, $resource)
    {
        parent::__construct($resource);
        $this->status  = $status;
        $this->message = $message;
    }

   /**
     * toArray
     *
     * @param  mixed $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        // Periksa apakah resource adalah model atau collection
        if ($this->resource instanceof \Illuminate\Database\Eloquent\Model) {
            return $this->processModel();
        }

        // Jika collection, proses setiap item
        return [
            'success'   => $this->status,
            'message'   => $this->message,
            'data'      => $this->resource->map(function ($item) {
                return [
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
                    'berkas_kk' => $item->relationLoaded('BerkasKk', function () use ($item) {
                        return $item->berkasKk ? new BerkaskkResource($item->berkasKk) : null;
                    }),
                    'berkas_ktp' => $item->relationLoaded('BerkasKtp', function () use ($item) {
                        return $item->berkasKtp ? new BerkasktpResource($item->berkasKtp) : null;
                    }),
                ];
            })
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
                'berkas_kk' => $this->relationLoaded('BerkasKk', function () {
                    return $this->berkasKk ? new BerkaskkResource($this->berkasKk) : null;
                }),
                'berkas_ktp' => $this->relationLoaded('BerkasKtp', function () {
                    return $this->berkasKtp ? new BerkasktpResource($this->berkasKtp) : null;
                }),
            ]
        ];
    }
}
