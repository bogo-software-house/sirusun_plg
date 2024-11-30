<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Database\Eloquent\Relations\hasOne;
use App\Models\Room;
use App\Models\Property;
use App\Models\Condition;
use App\Models\Information;

class DamageRoom extends Model
{
    use HasFactory;
    
    protected $table = 'damage_rooms'; // Nama tabel jika berbeda
    protected $primaryKey = 'custom_id'; // Menggunakan primary key custom_id sebagai primary key
    public $incrementing = false; // Jika custom_id bukan auto-incrementing
    protected $keyType = 'biginteger'; // Tipe kunci jika custom_id adalah string

    protected $fillable = [
        'custom_id',
        'properties_custom_id',
        'conditions_custom_id',
        'information_custom_id',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class, 'properties_custom_id', 'custom_id');
    }
    public function information(): BelongsTo
    {
        return $this->belongsTo(Information::class, 'information_custom_id', 'custom_id');
    }

    public function condition(): BelongsTo
    {
        return $this->belongsTo(Condition::class, 'conditions_custom_id', 'custom_id');
    }

  // semua kerusakan
    public function roomslantai(): HasMany
    {
        return $this->hasMany(Room::class, 'damage_rooms_lantai_custom_id', 'custom_id');
    }
  // semua kerusakan
    public function roomskusen(): HasMany
    {
        return $this->hasMany(Room::class, 'damage_rooms_kusen_custom_id', 'custom_id');
    }
  // semua kerusakan
    public function roomspintu(): HasMany
    {
        return $this->hasMany(Room::class, 'damage_rooms_pintu_custom_id', 'custom_id');
    }
  // semua kerusakan
    public function roomsjendela(): HasMany
    {
        return $this->hasMany(Room::class, 'damage_rooms_jendela_custom_id', 'custom_id');
    }
  // semua kerusakan
    public function roomsflatfond(): HasMany
    {
        return $this->hasMany(Room::class, 'damage_rooms_fn_flatfond_custom_id', 'custom_id');
    }
  // semua kerusakan
    public function roomsdinding(): HasMany
    {
        return $this->hasMany(Room::class, 'damage_rooms_fn_dinding_custom_id', 'custom_id');
    }
  // semua kerusakan
    public function roomsinstalasiair(): HasMany
    {
        return $this->hasMany(Room::class, 'damage_rooms_instalasi_air_custom_id', 'custom_id');
    }
  // semua kerusakan
    public function roomsinstalasilistrik(): HasMany
    {
        return $this->hasMany(Room::class, 'damage_rooms_instalasi_listrik_custom_id', 'custom_id');
    }

    /**
     * Get the Rooms associated with the DamageRoom
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function roomsThroughProperty(): HasManyThrough
    {
        return $this->hasManyThrough(
            Room::class, 
            Property::class, 
            'properties_custom_id', 
            'rooms_custom_id', 
            'custom_id', 
            'properties_custom_id'
        );
    }
}
