<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
      use HasFactory;
      
    protected $fillable = ['id', 'custom_id', 'Description'];

    // Metode untuk menghasilkan ID kustom
    public static function generateCustomId()
    {
        // Ambil ID terakhir dari tabel
        $lastItem = self::orderBy('custom_id', 'desc')->first();

        // Jika tidak ada item, mulai dari II0001
        if (!$lastItem) {
            return 'II0001';
        }

        // Ambil ID kustom terakhir
        $lastCustomId = $lastItem->custom_id;

        // Pisahkan huruf dan angka
        $number = (int) substr($lastCustomId, 2); // Mengambil bagian angka
        $newNumber = str_pad($number + 1, 4, '0', STR_PAD_LEFT); // Increment dan padding dengan 0

        return 'II' . $newNumber; // Gabungkan kembali menjadi ID baru
    }

}
