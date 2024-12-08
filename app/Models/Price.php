<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PriceTag;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\hasMany;

class Price extends Model
{
    use HasFactory;

    protected $fillable = [
        'custom_id',
        'price',
    ];

    public function priceTags(): HasMany
    {
        return $this->hasMany(PriceTag::class, 'prices_custom_id', 'custom_id');
    }
}
