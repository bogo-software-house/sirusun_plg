<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionStatusFormShowResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return  [
            'nik' => $this->residentPdf ? $this->residentPdf->nik  : null,
            'name' => $this->residentPdf && $this->residentPdf->resident ? $this->residentPdf->resident->username  : null,
            'status' => $this->statusForm ? $this->statusForm->status  : null,
            'keterangan' => $this->keterangan,
         
    ];
        }
}
