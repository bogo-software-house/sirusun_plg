<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use App\Models\PriceTag;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Blok extends Model
{

    use HasFactory;
      
    protected $fillable = [
        'custom_id', 
        'blok'
    ];

    //Relasi
      /**
     * Get all of the blok for the UnitNumber 
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function priceTags(): HasMany
    {
        return $this->hasMany(PriceTag::class, 'bloks_custom_id', 'custom_id');
    }
}
