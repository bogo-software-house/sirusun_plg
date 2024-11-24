<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use App\Models\PriceTag;
use App\Models\Property;

class Rusun extends Model
{
    use HasFactory;
    
    protected $table = 'rusuns';
    protected $primaryKey = 'custom_id';
    public $incrementing = false; // Menggunakan primary key custom_id sebagai ID unik
    protected $keyType = 'biginteger'; // Menggunakan tipe biginteger sebagai primary key

    // Metode untuk menghasilkan ID kustom
    public static function generateCustomId()
    {
        $prefix = 'IRN'; // Ganti dengan prefiks yang Anda inginkan
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
        'nama_rusun',
        'alamat',
        'luas',
        'jmlh_blok',
        'jmlh_lantai',
        'tahun_pembangunan',
        'fasilitas',
    ];

    //relasi
     /**
     * Get all of the Room for the Rusun
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function priceTags(): HasMany
    {
        return $this->hasMany(PriceTag::class, 'rusuns_custom_id', 'custom_id');
    }
    //Relasi untuk mendapatkan Property melalui Room dan Damage_room.
    public function property(): HasManyThrough
    {
        return $this->hasManyThrough(
            Property::class,            // Model tujuan
            Room::class,                // Model perantara
            'rusun_custom_id',          // Foreign key pada model Room (mengarah ke Rusun)
            'custom_id',                // Foreign key pada model tujuan (Property)
            'custom_id',                // Primary key pada model asal (Rusun)
            'damage_rooms_custom_id'    // Primary key pada model Room (mengarah ke Damage_room)
        );
    }

}
