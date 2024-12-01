<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasOne;
use App\Models\Room;
use App\Models\Blok;
use App\Models\Floor;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UnitNumber extends Model
{
    use HasFactory;

    protected $table = 'unit_numbers';
    protected $primaryKey = 'custom_id'; // Menggunakan primary key custom_id sebagai primary key

    protected $fillable = [
        'custom_id',
        'no_unit',
        'bloks_custom_id',
        'floors_custom_id',
    ];

    //Relasi One-to-Many
    public function bloks(): BelongsTo
    {
        return $this->belongsTo(Blok::class, 'bloks_custom_id', 'custom_id');
    }
    public function floors(): BelongsTo
    {
        return $this->belongsTo(Floor::class, 'floors_custom_id', 'custom_id');
    }

    //Relasi one-to-one
    public function room(): HasOne
    {
        return $this->hasOne(Room::class, 'unit_numbers_custom_id', 'custom_id');
    }

    // Metode untuk menghasilkan ID kustom
    public static function generateCustomId($blok, $lantai)
    {
        // Ambil ID terakhir dari tabel unit_numbers berdasarkan blok_custom_id dan floor_custom_id
        $lastItem = self::where('blok_custom_id', $blok)  // Filter berdasarkan blok_custom_id
                        ->where('floor_custom_id', $lantai)  // Filter berdasarkan floor_custom_id
                        ->orderBy('no_unit', 'desc')  // Urutkan berdasarkan nomor unit terakhir
                        ->first();

        // Jika tidak ada item, mulai dari unit 01
        if (!$lastItem) {
            return $blok . $lantai . '01';  // Format: BlokLantaiNomorUnit (misalnya A101 untuk blok A, lantai 1, unit 01)
        }

        // Ambil nomor unit terakhir dan increment
        $lastNoUnit = (int) substr($lastItem->no_unit, -2);  // Mengambil dua digit terakhir dari nomor unit
        $newNoUnit = str_pad($lastNoUnit + 1, 2, '0', STR_PAD_LEFT);  // Increment nomor unit dan pastikan dua digit

        // Gabungkan menjadi ID baru dalam format: BlokLantaiNomorUnit
        return $blok . $lantai . $newNoUnit;  // Misalnya A101, A102, B201, dst.
    }
}