<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use App\Models\resident;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StatusNikah extends Model
{
    use HasFactory;
    
    protected $fillable =[
    'custom_id',    
    'status_nikah',
    ];

    public function resident(): hasMany
    {
        return $this->hasMany(resident::class, 'status_nikah_custom_id', 'custom_id');
    }
}
