<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DamageRoom;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Condition extends Model
{
    use HasFactory;
      
    protected $fillable = [
        'custom_id', 
        'condition',
    ];

    public function damageRoom(): BelongsTo
    {
        return $this->belongsTo(DamageRoom::class, 'condition_custom_id', 'custom_id');
    }

}
