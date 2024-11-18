<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use App\Models\Role;
use Laravel\Sanctum\HasApiTokens; // Tambahkan ini


class User extends Authenticatable
{
   protected $table = 'users'; // Nama tabel jika berbeda
   

    use HasFactory, HasApiTokens, Notifiable;

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

    protected $hidden = [
    'password',
    'remember_token',
];

    public function role(): BelongsTo
    {
        return $this->BelongsTo(Role::class, 'roles_custom_id', 'custom_id');
    }

   // Method untuk memeriksa role
    public function hasRole($roles)
    {
        // Pastikan $roles adalah array
        $roles = is_array($roles) ? $roles : func_get_args();

        // Periksa apakah role pengguna ada dan cocok dengan role yang diizinkan
        return $this->role && in_array($this->role->leveluser, $roles);
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
