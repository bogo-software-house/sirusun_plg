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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Menambahkan kolom nik yang unik
            $table->string('custom_id')->unique(); // custom user
            $table->string('username');
            $table->string('password');
            $table->string('transaksi_custom_id'); // Menambahkan kolom nik yang unik
            $table->string('roles_custom_id');
            $table->rememberToken(); // Kolom untuk token ingat
            $table->timestamps();

            // Menambahkan foreign key
            $table->foreign('roles_custom_id')->references('custom_id')->on('roles')->onDelete('cascade');
            $table->foreign('transaksi_custom_id')->references('custom_id')->on('transaction_status_forms')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');

    }
};
