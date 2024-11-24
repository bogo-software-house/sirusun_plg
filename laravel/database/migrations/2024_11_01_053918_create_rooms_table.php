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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('custom_id')->unique();
            $table->string('rusuns_custom_id');
            $table->string('unit_numbers_custom_id');
            $table->string('statuses_custom_id');
            $table->string('damage_rooms_custom_id');
            $table->timestamps();

            //membuat relasi 
            $table->foreign('rusuns_custom_id')->references('custom_id')->on('rusuns')->onDelete('cascade');
            $table->foreign('unit_numbers_custom_id')->references('custom_id')->on('unit_numbers')->onDelete('cascade');
            $table->foreign('statuses_custom_id')->references('custom_id')->on('statuses')->onDelete('cascade');
            $table->foreign('damage_rooms_custom_id')->references('custom_id')->on('damage_rooms')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
