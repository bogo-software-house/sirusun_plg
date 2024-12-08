<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DamageRoom;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Condition extends Model
{
    use HasFactory;
      
    protected $fillable = [
        'custom_id', 
        'condition',
    ];

    public function damageRoom(): HasOne
    {
        return $this->hasOne(DamageRoom::class, 'conditions_custom_id', 'custom_id');
    }

}
