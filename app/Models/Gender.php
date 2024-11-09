<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use App\Models\resident;

class Gender extends Model
{
    protected $fillable = [
    'custom_id',
    'gender',
    ];

    //relasi
     /**
     * Get all of the resident for the Gender
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function resident(): HasMany
    {
        return $this->hasMany(resident::class, 'genders_custom_id', 'custom_id');
    }

}
