<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Resident;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class BerkasKk extends Model
{
    use HasFactory;

    protected $table = 'berkas_kks';

    protected $fillable = ['nik', 'file_name', 'file_path', 'file_url'];


    // Relasi dengan model Resident
    public function resident(): BelongsTo
    {
        return $this->BelongsTo(Resident::class, 'nik', 'nik');
    }

  
}
