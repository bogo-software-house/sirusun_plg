<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Resident;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ResidentPdf extends Model
{
    use HasFactory;

    protected $table = 'resident_pdfs';

    protected $fillable = ['nik', 'file_name', 'file_path', 'file_url'];

    public function resident(): BelongsTo
    {
        return $this->belongsTo(Resident::class, 'nik', 'nik');
    }
}
