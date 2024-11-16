<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\BerkasKk;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class BerkaskkResource extends JsonResource
{
   public function toArray($request)
    {
        // Konversi data apapun ke format yang konsisten
        $data = is_array($this->resource) 
            ? $this->resource 
            : (array) $this->resource;

        return [
            'success' => true,
            'message' => 'Detail Data',
            'data' => [
                'nik' => $data['nik'] ?? null,
                'file_name' => $data['file_name'] ?? null,
                'file_path' => $data['file_path'] ?? null,
            ]
        ];
    }
}
