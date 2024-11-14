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
        Schema::create('rusuns', function (Blueprint $table) {
           $table->id();
            $table->string('custom_id')->unique(); // Kolom untuk menyimpan ID kustom
           $table->string('Name_Rusun'); // Kolom untuk menyimpan ID kustom
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rusuns');
    }
};
