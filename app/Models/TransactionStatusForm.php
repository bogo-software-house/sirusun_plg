<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\StatusForm;
use App\Models\ResidentPdf;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionStatusForm extends Model
{
    
    protected $fillable = [
        'custom_id',
        'form_custom_id',
        'statusForm_custom_id'];

    public function statusForm(): BelongsTo
    {
        return $this->belongsTo(StatusForm::class, 'statusForm_custom_id', 'custom_id');
    }
    public function residentPdf(): BelongsTo
    {
        return $this->belongsTo(ResidentPdf::class, 'form_custom_id', 'custom_id');
    }

      // Metode untuk menghasilkan ID kustom
    public static function generateCustomId()
    {
        $prefix = 'ITF'; // Ganti dengan prefiks yang Anda inginkan
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
}
