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
            $table->bigInteger('nik')->default(16)->unique()->primary(); // Menambahkan kolom nik yang unik
            $table->string('username');
            $table->string('tempat_lahir');
            $table->string('roles_custom_id');
            $table->string('email')->unique();
            $table->timestamps();

            // Menambahkan foreign key
            $table->foreign('roles_custom_id')->references('custom_id')->on('roles')->onDelete('cascade');
            
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
