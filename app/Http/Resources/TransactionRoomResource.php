<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionRoomResource extends JsonResource
{
   
    public function toArray(Request $request): array
    {
        return  [ 
            'custom_id' => $this->custom_id,
            'nik' => $this->user ? $this->user->nik : null,
            'data_user' => [
           'nama' => $this->user ? $this->user->username : null,
           'no_telp' =>$this->user && $this->user->transactionstatusform && $this->user->transactionstatusform->residentPdf && $this->user->transactionstatusform->residentPdf->resident 
                ? $this->user->transactionstatusform->residentPdf->resident->no_telp 
                : null,
           'email' => $this->user && $this->user->transactionstatusform && $this->user->transactionstatusform->residentPdf && $this->user->transactionstatusform->residentPdf->resident 
                ? $this->user->transactionstatusform->residentPdf->resident->email 
                : null,
            ],
            'rusun' => $this->room && $this->room->priceTag->rusuns ? $this->room->priceTag->rusuns->nama_rusun : null,
            'kamar' => [
                'lantai' => $this->room && $this->room->priceTag->floors ? $this->room->priceTag->floors->floor : null,
                'blog' => $this->room && $this->room->priceTag->bloks ? $this->room->priceTag->bloks->blok : null,
                'no' => $this->room && $this->room->UnitNumber ? $this->room->UnitNumber->no_unit : null,
           ]
        ];
    }
}
