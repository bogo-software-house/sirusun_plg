<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\BerkasKtp;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class BerkasktpResource extends JsonResource
{
    protected $success;
    protected $message;

    public function __construct($success = true, $message = '', $resource = null)
    {
        $this->success = $success;
        $this->message = $message;
        parent::__construct($resource);
    }

    public function toArray($request)
    {
       // Jika resource null, kembalikan respons default
        if ($this->resource === null) {
            return [
                'success' => false,
                'message' => 'No data found',
                'data' => null
            ];
        }

        // Jika resource adalah collection
        if ($this->resource instanceof \Illuminate\Support\Collection) {
            return [
                'success' => $this->success,
                'message' => $this->message,
                'data' => $this->resource->map(function($item) {
                    return [
                        'nik' => $item->nik ?? null,
                        'file_name' => $item->file_name ?? null,
                        'file_path' => $item->file_path ? Storage::url($item->file_path) : null,
                    ];
                })
            ];
        }

        // Jika resource adalah single item atau model
        return [
            'success' => $this->success,
            'message' => $this->message,
            'data' => [
                'nik' => $this->nik ?? null,
                'file_name' => $this->file_name ?? null,
                'file_path' => $this->file_path ? Storage::url($this->file_path) : null,
            ]
        ];
    }
}
