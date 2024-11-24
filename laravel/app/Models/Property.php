<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\DamageRoom;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\hasMany;


class Property extends Model
{
    use HasFactory;
      
    protected $fillable = [
        'custom_id', 
        'property',
    ];

    /**
     * Get all of the DamageRoom for the Property
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function damageRooms(): HasMany
    {
        return $this->hasMany(DamageRoom::class, 'property_custom_id', 'custom_id');
    }

}
