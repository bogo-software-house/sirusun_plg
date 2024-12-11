<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ReportRoom extends Model
{
      use HasFactory;

    protected $table = 'report_rooms';
    protected $fillable = [
        'room_custom_id',
        'bulan',
        'tahun',
        'kondisi_sebelumnya',
        'kondisi_setelahnya',
    ];
}
