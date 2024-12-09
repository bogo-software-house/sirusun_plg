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
            'user' => $this->user ? $this->user->username : null,
            'kamar' => [
           'no' => $this->room && $this->room->UnitNumber ? $this->room->UnitNumber->no_unit : null,
           'blog' => $this->room && $this->room->priceTag->bloks ? $this->room->priceTag->bloks->blok : null,
           'price' => $this->room && $this->room->priceTag->price ? $this->room->priceTag->price->price : null,
           ]
        ];
    }
}
