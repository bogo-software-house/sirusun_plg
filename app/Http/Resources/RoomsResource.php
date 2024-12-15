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
            'rusun' => $this->priceTag && $this->priceTag->rusuns ? $this->priceTag->rusuns->nama_rusun : null,
            'kordinat' => $this->priceTag && $this->priceTag->rusuns ? $this->priceTag->rusuns->kordinat : null,
            'blok' => $this->priceTag && $this->priceTag->bloks ? $this->priceTag->bloks->blok : null,
            'lantai' => $this->priceTag && $this->priceTag->floors ? $this->priceTag->floors->floor : null,
            'price' => $this->priceTag && $this->priceTag->price ? $this->priceTag->price->price : null,
            'status' => $this->status ? $this->status->status : null,
            'kondisi' => [
                'lantai_id' => $this->damageRoomlantai ? $this->damageRoomlantai->custom_id : null,
                'lantai' => $this->damageRoomlantai && $this->damageRoomlantai->condition ? $this->damageRoomlantai->condition->condition : null,
                'kusen_id' => $this->damageRoomkusen ? $this->damageRoomkusen->custom_id : null,
                'kusen' => $this->damageRoomkusen && $this->damageRoomkusen->condition ? $this->damageRoomkusen->condition->condition : null,
                'pintu_id' => $this->damageRoompintu ? $this->damageRoompintu->custom_id : null,
                'pintu' => $this->damageRoompintu && $this->damageRoompintu->condition ? $this->damageRoompintu->condition->condition : null,
                'jendela_id' =>$this->damageRoomjendela ? $this->damageRoomjendela->custom_id : null,
                'jendela' =>$this->damageRoomjendela && $this->damageRoomjendela->condition ? $this->damageRoomjendela->condition->condition : null,
                'fn_flatfond_id' =>$this->damageRoomflatfond ? $this->damageRoomflatfond->custom_id : null,
                'fn_flatfond' =>$this->damageRoomflatfond && $this->damageRoomflatfond->condition ? $this->damageRoomflatfond->condition->condition : null,
                'fn_dinding_id' =>$this->damageRoomdinding ? $this->damageRoomdinding->custom_id : null,
                'fn_dinding' =>$this->damageRoomdinding && $this->damageRoomdinding->condition ? $this->damageRoomdinding->condition->condition : null,
                'instalasi_listrik_id' =>$this->damageRoominstalasilistrik ? $this->damageRoominstalasilistrik->custom_id : null, 
                'instalasi_listrik' =>$this->damageRoominstalasilistrik && $this->damageRoominstalasilistrik->condition ? $this->damageRoominstalasilistrik->condition->condition : null, 
                'instalasi_air_id' => $this->damageRoominstalasiair ? $this->damageRoominstalasiair->custom_id : null,
                'instalasi_air' => $this->damageRoominstalasiair && $this->damageRoominstalasiair->condition ? $this->damageRoominstalasiair->condition->condition : null,
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
