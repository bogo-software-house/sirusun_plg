<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Resident;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BerkasKk extends Model
{
    use HasFactory;

    protected $fillable =[
        'nik',
        'file_path'
    ] ; 

    public function resident(): BelongsTo
    {
        return $this->BelongsTo(Resident::class,'nik','nik');
    } 
}
