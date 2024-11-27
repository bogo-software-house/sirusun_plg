<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'custom_id' => $this->custom_id,
            'unit_number' => $this->UnitNumber ? $this->UnitNumber->no_unit : null,
            'price' => $this->priceTag && $this->priceTag->price ? $this->priceTag->price->price : null,
            'status' => $this->status ? $this->status->status : null,
            'damage_rooms' => [
                'lantai' => $this->damageRoomlantai && $this->damageRoomlantai ? $this->damageRoomlantai->properties_custom_id : null,
                'kusen' => $this->damage_rooms_kusen_custom_id,
                'pintu' => $this->damage_rooms_pintu_custom_id,
                'jendela' => $this->damage_rooms_jendela_custom_id,
                'fn_flatfond' => $this->damage_rooms_fn_flatfond_custom_id,
                'fn_dinding' => $this->damage_rooms_fn_dinding_custom_id,
                'instalasi_air' => $this->damage_rooms_instalasi_air_custom_id,
                'instalasi_listrik' => $this->damage_rooms_instalasi_listrik_custom_id,
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
