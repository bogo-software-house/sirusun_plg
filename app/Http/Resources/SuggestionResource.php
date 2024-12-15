<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SuggestionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'custom_id' => $this->custom_id,
            'description' => $this->description,
            'contact' => [
                'email' => $this->email,
                'nama' => $this->nama
            ],

        ];
    }
}