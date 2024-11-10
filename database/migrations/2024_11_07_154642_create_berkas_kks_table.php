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
        Schema::create('berkas_kks', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('nik')->default(16)->unique();
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_url'); // Menyimpan path berkas kk
            $table->timestamps();

               $table->foreign('nik')->references('nik')->on('residents')->onDelete('cascade');
          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berkas_kks');
    }
};
