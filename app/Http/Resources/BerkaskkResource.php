<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\BerkasKk;

class BerkaskkResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         // Periksa berbagai kondisi
    if ($this->file_path === true) {
        // Jika boolean true, cari file di database
        $fileModel = BerkasKk::where('nik', $this->nik)->first();
        
        return [
            'file_path' => $fileModel 
                ? [
                    'url' => url('storage/' . $fileModel->file_path),
                    'filename' => basename($fileModel->file_path)
                ]
                : null
        ];
    } elseif (is_string($this->file_path)) {
        // Jika sudah string path
        return [
            'file_path' => url('storage/' . $this->file_path)
        ];
    }
    
    // Kembalikan null jika tidak ada file
    return [
        'file_path' => null
    ];
    }

    
}
