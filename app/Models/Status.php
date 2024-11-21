<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Room;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Status extends Model
{
      use HasFactory;
      
    protected $fillable = [
        'custom_id', 
        'status'
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'statuses_custom_id', 'custom_id');
    }

}
