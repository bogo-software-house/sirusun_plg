<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BerkasktpResource extends JsonResource
{
  public function toArray($request)
    {
        return [

            'nik' => $this->nik,
            'file_name' => $this->file_name,
            'file_path' => $this->file_path,
            'file_url' => $this->file_url,
        ];
    }
}
