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
        Schema::create('damage_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('custom_id')->unique();
            $table->string('properties_custom_id');
            $table->string('conditions_custom_id');
            $table->string('information_custom_id');
            $table->timestamps();

            //membuat relasi
            $table->foreign('properties_custom_id')->references('custom_id')->on('properties')->onDelete('cascade');
            $table->foreign('conditions_custom_id')->references('custom_id')->on('conditions')->onDelete('cascade');
            $table->foreign('information_custom_id')->references('custom_id')->on('information_damages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('damage_rooms');
    }
};
