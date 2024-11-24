<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\UnitNumber;


class Floor extends Model
{
      use HasFactory;
      
    protected $fillable = [
        'custom_id', 
        'floor',
        'prices_custom_id',
    ];

    // Relasi One-to-Many dengan Model UnitNumber
    public function unitNumbers(): HasMany
    {
        return $this->hasMany(UnitNumber::class, 'floors_custom_id', 'custom_id');
    }

    // Relasi ke Price
    public function price()
    {
        return $this->belongsTo(Price::class, 'prices_custom_id', 'custom_id');
    }
    
}
