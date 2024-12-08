<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use App\models\User;

class Role extends Model
{
     use HasFactory;
    protected $table = 'roles';

     protected $fillabe = [
        'id',
        'custom_id',
        'leveluser',
];

    public function  users(): hasMany
    {
        return  $this->hasMany(User::class,'roles_custom_id', 'custom_id');
    }
}
