<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionStatusFormResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->residentPdf,
            'resident' => $this->residentPdf->resident->BerkasKk,
            'resident' => $this->residentPdf->resident->BerkasKtp,
            'resident' => $this->residentPdf->resident->berkasSalary,
        ];
    }
}
