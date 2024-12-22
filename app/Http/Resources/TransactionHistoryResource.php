<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'custom_id' => $this->custom_id,
            'model_type' => class_basename($this->model_type),
            'model_id' => $this->model_id,
            'action' => $this->action,
            'old_data' => $this->old_data,
            'new_data' => $this->new_data,

            'created_at' => $this->created_at->toIso8601String(),
            'created_at_human' => $this->created_at->diffForHumans()
        ];
    }
}