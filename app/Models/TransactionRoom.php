<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TransactionRoom extends Model
{
    use HasFactory;
    
    protected $table = 'transaction_rooms';

    // Metode untuk menghasilkan ID kustom
    public static function generateCustomId()
    {
        $prefix = 'ITR'; // Ganti dengan prefiks yang Anda inginkan
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
        'users_custom_id',
        'rooms_custom_id',
        'nik',
    ];
        
         
         
        public function user(): BelongsTo
        {
            return $this->belongsTo(User::class, 'users_custom_id', 'custom_id');
        }
        public function usernik(): BelongsTo
        {
            return $this->belongsTo(User::class, 'nik', 'nik');
        }
        public function room(): BelongsTo
        {
            return $this->belongsTo(Room::class, 'rooms_custom_id', 'custom_id');
        }
    
}
