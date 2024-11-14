<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use App\Models\Role;

class User extends Authenticatable
{
   protected $table = 'users'; // Nama tabel jika berbeda
    protected $primaryKey = 'nik'; // Menggunakan kolom nik sebagai kunci utama
    public $incrementing = false; // Jika nik bukan auto-incrementing
    protected $keyType = 'biginteger'; // Tipe kunci jika nik adalah string

    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'custom_id',
        'username',
        'password',
        'transaksi_custom_id',
        'roles_custom_id',
    ];

    public function role(): BelongsTo
    {
        return $this->BelongsTo(Role::class, 'roles_custom_id', 'custom_id');
    }

       // Metode untuk menghasilkan ID kustom
    public static function generateCustomId()
    {
        $prefix = 'IUS'; // Ganti dengan prefiks yang Anda inginkan
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
