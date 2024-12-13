<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\PriceTag;
use App\Models\Rusun;
use App\Models\DamageRoom;
use App\Models\UnitNumber;
use App\Models\Status;
use App\Models\TransactionRoom;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Validation\ValidationException;

class Room extends Model
{

    use HasFactory;

    protected $table = 'rooms'; // Nama tabel jika berbeda
    protected $primaryKey = 'custom_id'; // Menggunakan kolom custom_id sebagai kunci utama
    public $incrementing = false; // Jika custom_id bukan auto-incrementing
    protected $keyType = 'string'; // Tipe kunci jika custom_id adalah string
    
    // Metode untuk menghasilkan ID kustom
    public static function generateCustomId()
    {
        $prefix = 'IRM'; // Ganti dengan prefiks yang Anda inginkan
        $lastItem = self::orderBy('custom_id', 'desc')->first();
  
        // Jika tidak ada item, mulai dari ISPER0001
        if (!$lastItem) {
            return $prefix . '0001';
        }
  
        // Ambil ID kustom terakhir
        $lastCustomId = $lastItem->custom_id;
  
        // Pisahkan huruf dan angka
        $number = (int) substr($lastCustomId, strlen($prefix)); // Mengambil bagian angka
        $newNumber = str_pad($number + 1, 4, '0', STR_PAD_LEFT); // Increment dan padding dengan 0
        $newCustomId = $prefix . $newNumber; // Gabungkan kembali menjadi ID baru
  
        // Cek apakah custom_id sudah ada
        while (self::where('custom_id', $newCustomId)->exists()) {
            $number++;
            $newNumber = str_pad($number, 4, '0', STR_PAD_LEFT);
            $newCustomId = $prefix . $newNumber;
        }
        return $newCustomId; // Kembalikan ID baru yang unik
    }

    protected $fillable = [
        'custom_id',
        'unit_numbers_custom_id',
        'price_tags_custom_id',
        'statuses_custom_id',
        'damage_rooms_lantai_custom_id',
        'damage_rooms_kusen_custom_id',
        'damage_rooms_pintu_custom_id',
        'damage_rooms_jendela_custom_id' ,
        'damage_rooms_fn_flatfond_custom_id',
        'damage_rooms_fn_dinding_custom_id',
        'damage_rooms_instalasi_air_custom_id' ,
        'damage_rooms_instalasi_listrik_custom_id',
        
    ];

    protected static function boot()
    {
        parent::boot();
        // Custom validation
        static::creating(function ($model) {
            if (empty($model->custom_id)) {
                $model->custom_id = static::generateCustomId();
            }
        });
    }

    // Relasi One-to-Many

    public function damageRoomlantai(): BelongsTo
    {
        return $this->belongsTo(DamageRoom::class, 'damage_rooms_lantai_custom_id', 'custom_id');
    }
    public function damageRoomkusen(): BelongsTo
    {
        return $this->belongsTo(DamageRoom::class, 'damage_rooms_kusen_custom_id', 'custom_id');
    }
    public function damageRoompintu(): BelongsTo
    {
        return $this->belongsTo(DamageRoom::class, 'damage_rooms_pintu_custom_id', 'custom_id');
    }
    public function damageRoomjendela(): BelongsTo
    {
        return $this->belongsTo(DamageRoom::class, 'damage_rooms_jendela_custom_id', 'custom_id');
    }
    public function damageRoomflatfond(): BelongsTo
    {
        return $this->belongsTo(DamageRoom::class, 'damage_rooms_fn_flatfond_custom_id', 'custom_id');
    }
    public function damageRoomdinding(): BelongsTo
    {
        return $this->belongsTo(DamageRoom::class, 'damage_rooms_fn_dinding_custom_id', 'custom_id');
    }
    public function damageRoominstalasiair(): BelongsTo
    {
        return $this->belongsTo(DamageRoom::class, 'damage_rooms_instalasi_air_custom_id', 'custom_id');
    }
    public function damageRoominstalasilistrik(): BelongsTo
    {
        return $this->belongsTo(DamageRoom::class, 'damage_rooms_instalasi_listrik_custom_id', 'custom_id');
    }
    public function unitNumber(): BelongsTo
    {
        return $this->belongsTo(UnitNumber::class, 'unit_numbers_custom_id', 'custom_id');
    }

    /**
     * Get the statusrooms associated with the rooms
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class, 'statuses_custom_id', 'custom_id');
    }
    public function priceTag(): BelongsTo
    {
        return $this->belongsTo(PriceTag::class, 'price_tags_custom_id', 'custom_id');
    }


    // Relasi untuk mendapatkan Properti melalui DamageRoom
    public function property(): HasManyThrough
    {
        return $this->hasManyThrough(
            Property::class,        // Model tujuan
            DamageRoom::class,      // Model perantara
            'custom_id',            // Foreign key pada model perantara (Damage_room)
            'custom_id',            // Foreign key pada model tujuan (Property)
            'rusuns_custom_id',     // Primary key pada model asal (Room)
            'custom_id'             // Primary key pada model perantara (Damage_room)
        );
    }

    
     
    public function transactionRoom(): HasOne
    {
        return $this->hasOne(TransactionRoom::class, 'rooms_custom_id', 'custom_id');
    }
    public function reportRoom(): HasMany
    {
        return $this->hasMany(ReportRoom::class, 'rooms_custom_id', 'custom_id');
    }

}
