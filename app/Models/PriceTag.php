<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Rusun;
use App\Models\Blok;
use App\Models\Floor;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Validation\ValidationException;

class PriceTag extends Model
{
    use HasFactory;

    protected $table = 'pricetags'; // Nama tabel jika berbeda
    protected $primaryKey = 'custom_id'; // Menggunakan kolom custom_id sebagai kunci utama
    public $incrementing = false; // Jika custom_id bukan auto-incrementing
    protected $keyType = 'string'; // Tipe kunci jika custom_id adalah string


    // Metode untuk menghasilkan ID kustom
    public static function generateCustomId()
    {
        $prefix = 'IPT'; // Ganti dengan prefiks yang Anda inginkan
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
        'rusuns_custom_id',
        'bloks_custom_id',
        'floors_custom_id',
        'prices_custom_id',
    ];

    public function rusuns(): BelongsTo
    {
        return $this->belongsTo(Rusun::class, 'rusuns_custom_id', 'custom_id');
    }
    public function bloks(): BelongsTo
    {
        return $this->belongsTo(Blok::class, 'bloks_custom_id', 'custom_id');
    }
    public function floors(): BelongsTo
    {
        return $this->belongsTo(Floor::class, 'floors_custom_id', 'custom_id');
    }

     /**
     * Get the BerkasKk associated with the Resident
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function Price(): HasOne
    {
        return $this->hasOne(Price::class, 'prices_custom_id', 'custom_id');
    }
    
}
