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
        Schema::create('forms', function (Blueprint $table) {
              $table->id();
            $table->string('custom_id')->unique();
            $table->bigInteger('resident_custom_id');
            $table->string('path_berkas');
            $table->timestamps();

            $table->foreign('resident_custom_id')->references('nik')->on('residents')->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forms');
    }
};
