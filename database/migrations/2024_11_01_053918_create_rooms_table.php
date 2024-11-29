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
            $table->string('price_tags_custom_id');
            $table->string('unit_numbers_custom_id');
            $table->string('statuses_custom_id');
            $table->string('damage_rooms_lantai_custom_id')->nullable();
            $table->string('damage_rooms_kusen_custom_id')->nullable();
            $table->string('damage_rooms_pintu_custom_id')->nullable();
            $table->string('damage_rooms_jendela_custom_id')->nullable();
            $table->string('damage_rooms_fn-flatfond_custom_id')->nullable();
            $table->string('damage_rooms_fn-dinding_custom_id')->nullable();
            $table->string('damage_rooms_instalasi-listrik_custom_id')->nullable();
            $table->string('damage_rooms_instalasi-air_custom_id')->nullable();
            $table->timestamps();

            //membuat relasi 
            $table->foreign('price_tags_custom_id')->references('custom_id')->on('price_tags')->onDelete('cascade');
            $table->foreign('unit_numbers_custom_id')->references('custom_id')->on('unit_numbers')->onDelete('cascade');
            $table->foreign('statuses_custom_id')->references('custom_id')->on('statuses')->onDelete('cascade');
            $table->foreign('damage_rooms_lantai_custom_id')->references('custom_id')->on('damage_rooms')->onDelete('cascade');
            $table->foreign('damage_rooms_kusen_custom_id')->references('custom_id')->on('damage_rooms')->onDelete('cascade');
            $table->foreign('damage_rooms_pintu_custom_id')->references('custom_id')->on('damage_rooms')->onDelete('cascade');
            $table->foreign('damage_rooms_jendela_custom_id')->references('custom_id')->on('damage_rooms')->onDelete('cascade');
            $table->foreign('damage_rooms_fn_flatfond_custom_id')->references('custom_id')->on('damage_rooms')->onDelete('cascade');
            $table->foreign('damage_rooms_fn_dinding_custom_id')->references('custom_id')->on('damage_rooms')->onDelete('cascade');
            $table->foreign('damage_rooms_instalasi_listrik_custom_id')->references('custom_id')->on('damage_rooms')->onDelete('cascade');
            $table->foreign('damage_rooms_instalasi_air_custom_id')->references('custom_id')->on('damage_rooms')->onDelete('cascade');

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
