<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\resident;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Education extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'custom_id',
        'education',

    ];

        public function resident(): hasMany{

            return $this->hasMany(resident::class, 'education_custom_id', 'custom_id');
        }
}
