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
        'nik',
        'username',
        'tempat_lahir',
        'roles_custom_id',
        'email',
    ];

    /**
     * Mendapatkan relasi role untuk pengguna.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
  protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (strlen($model->nik) !== 16) {
                throw ValidationException::withMessages([
                    'nik' => 'Nik harus terdiri dari 16 karakter.',
                ]);
            }
        });

    
    }

    public function role(): BelongsTo
    {
        return $this->BelongsTo(Role::class, 'roles_custom_id', 'custom_id');
    }
}
