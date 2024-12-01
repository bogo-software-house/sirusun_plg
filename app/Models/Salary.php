<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Resident;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\hasMany;

class Salary extends Model
{
     use HasFactory;
    protected $table = 'salaries';

     protected $fillabe = [
        'id',
        'custom_id',
        'salary',
];

    public function  resident(): hasMany
    {
        return  $this->hasMany(Resident::class,'salaries_custom_id', 'custom_id');
    }
}
