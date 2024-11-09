<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BerkasktpResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [
    'file_path' => $this->file_path 
            ? [
                'url' => url('storage/' . $this->file_path),
                'filename' => basename($this->file_path)
            ] 
            : null,          // tambahkan field lain sesuai kebutuhan
        ];
    }
}
