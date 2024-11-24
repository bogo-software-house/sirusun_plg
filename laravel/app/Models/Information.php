<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use App\Models\DamageRoom;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Information extends Model
{
      use HasFactory;
      
    protected $fillable = [
        'custom_id', 
        'information',
    ];

    // Relasi One-to-Many dengan Model DamageRoom
    public function damageRoom(): HasMany
    {
        return $this->hasMany(DamageRoom::class, 'information_custom_id', 'custom_id');
    }

}
