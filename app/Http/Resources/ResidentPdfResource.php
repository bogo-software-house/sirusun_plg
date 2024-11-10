<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResidentPdfResource extends JsonResource
{
  public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nik' => $this->nik,
            'file_name' => $this->file_name,
            'file_path' => $this->file_path,
            'file_url' => $this->file_url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
