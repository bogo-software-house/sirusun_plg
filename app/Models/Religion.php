<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use App\Models\resident;

class Religion extends Model
{
    protected $fillable = [
    'custom_id',
    'religions',
    ];

    //relasi
     /**
     * Get all of the resident for the religions
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function resident(): hasMany
    {
        return $this->hasMany(resident::class, 'religions_custom_id', 'custom_id');
    }

}
