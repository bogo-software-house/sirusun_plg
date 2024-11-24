<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PriceTag;


class Floor extends Model
{
    use HasFactory;
      
    protected $fillable = [
        'custom_id', 
        'floor',

    ];

    //relasi
     /**
     * Get all of the resident for the Gender
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */   
    public function priceTags(): HasMany
    {
        return $this->hasMany(PriceTag::class, 'floors_custom_id', 'custom_id');
    }
    
}
