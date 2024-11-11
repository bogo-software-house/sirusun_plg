<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\models\Religion;
use App\models\Education;
use App\models\StatusNikah;
use App\models\Gender;
use App\models\ResidentPdf;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Validation\ValidationException;

class Resident extends Model
{

 protected $table = 'Residents'; // Nama tabel jika berbeda
    protected $primaryKey = 'nik'; // Menggunakan kolom nik sebagai kunci utama
    public $incrementing = false; // Jika nik bukan auto-incrementing
    protected $keyType = 'biginteger'; // Tipe kunci jika nik adalah string


    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nik',
        'username',
        'tempat_lahir',
        'tanggal_lahir',
        'genders_custom_id',
        'status_nikah_custom_id',
        'religions_custom_id',
        'education_custom_id',
        'alamat_rumah',
        'no_telp',
        'penghasilan',
        'warga_negara',
        'pekerjaan',
        'alamat_tempat_kerja',
      ];



     protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (strlen($model->nik) !== 16) {
                throw ValidationException::withMessages([
                    'nik' => 'Nik harus terdiri dari 16 karakter.',
                ]);
            }

              // Validasi bahwa NIK hanya berisi angka
            if (!preg_match('/^\d+$/', $model->nik)) {
                throw ValidationException::withMessages([
                    'nik' => 'NIK harus terdiri dari angka saja.',
                ]);

            }
        });
    }

    public function genders(): BelongsTo
    {
        return $this->BelongsTo(Gender::class, 'genders_custom_id', 'custom_id');
    }
    public function religions(): BelongsTo
    {
        return $this->BelongsTo(Religion::class, 'religions_custom_id', 'custom_id');
    }
    public function education(): BelongsTo
    {
        return $this->BelongsTo(Education::class, 'education_custom_id', 'custom_id');
    }
    public function StatusNikah(): BelongsTo
    {
        return $this->BelongsTo(StatusNikah::class, 'status_nikah_custom_id', 'custom_id');
    }
    /**
     * Get the BerkasKk associated with the Resident
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function BerkasKk(): HasOne
    {
        return $this->hasOne(Resident::class, 'nik', 'nik');
    }
    public function BerkasKtp(): HasOne
    {
        return $this->hasOne(Resident::class, 'nik', 'nik');
    }
      // Tambahkan relasi dengan ResidentPdf
    public function residentPdf(): HasOne
    {
        return $this->hasOne(ResidentPdf::class, 'nik', 'nik');
    }

    // Relasi untuk mendapatkan transaction status form melalui ResidentPdf
    public function transactionStatusForm(): HasManyThrough
    {
        return $this->hasManyThrough(
            TransactionStatusForm::class,  // Model tujuan
            ResidentPdf::class,            // Model perantara
            'nik',                         // Foreign key pada model perantara (ResidentPdf)
            'form_custom_id',              // Foreign key pada model tujuan (TransactionStatusForm)
            'nik',                         // Primary key pada model asal (Resident)
            'custom_id'                    // Primary key pada model perantara (ResidentPdf)
        );

    }
}
