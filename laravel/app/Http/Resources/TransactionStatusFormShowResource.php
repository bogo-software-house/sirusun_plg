<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionStatusFormShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
            'form_custom_id' => $this->resident_pdfs->nik,
            'status' => $this->status_form->status,
            'file_url' => $this->resident_pdf->file_url,
            'username' => $this->resident_pdf->resident->username];
    }
}
