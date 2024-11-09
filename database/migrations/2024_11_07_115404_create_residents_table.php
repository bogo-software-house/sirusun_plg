<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('residents', function (Blueprint $table) {
             $table->bigInteger('nik')->default(16)->unique()->primary(); // Menambahkan kolom nik yang unik
            $table->string('username');
            $table->string('tempat_lahir');
            $table->string('tanggal_lahir');
            $table->string('genders_custom_id');
            $table->string('status_nikah_custom_id');
            $table->string('religions_custom_id');
            $table->string('education_custom_id');
            $table->string('alamat_rumah');
            $table->string('no_telp');
            $table->string('penghasilan');
            $table->string('warga_negara');
            $table->string('pekerjaan');
            $table->string('alamat_tempat_kerja');
            $table->timestamps();


               // Menambahkan foreign key
            $table->foreign('genders_custom_id')->references('custom_id')->on('genders')->onDelete('cascade');
            $table->foreign('status_nikah_custom_id')->references('custom_id')->on('status_nikahs')->onDelete('cascade');
            $table->foreign('religions_custom_id')->references('custom_id')->on('religions')->onDelete('cascade');
            $table->foreign('education_custom_id')->references('custom_id')->on('education')->onDelete('cascade');      
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
