<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suggestion extends Model
{
       protected $fillable = [
        'custom_id',
        'description',
        'email',
        'nama',

    ];


    // Generate custom ID
    public static function generateCustomId()
    {
        $prefix = 'SGN';
        $latestRecord = self::orderBy('id', 'desc')->first();
        $number = $latestRecord ? intval(substr($latestRecord->custom_id, 4)) + 1 : 1;
        return $prefix . str_pad($number, 6, '0', STR_PAD_LEFT);
    }

}
