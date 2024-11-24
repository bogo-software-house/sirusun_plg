<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Floor;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Price extends Model
{
    use HasFactory;

    protected $fillable = [
        'custom_id',
        'price',
    ];

    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class, 'prices_custom_id', 'custom_id');
    }
}
