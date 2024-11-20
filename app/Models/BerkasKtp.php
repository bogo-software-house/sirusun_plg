<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Resident;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BerkasKtp extends Model
{
     use HasFactory;

    protected $table = 'berkas_ktps';
    protected $fillable = ['nik', 'file_name', 'file_path', 'file_url'];

    public function resident(): BelongsTo
    {
        return $this->BelongsTo(Resident::class,'nik','nik');
    }
}
