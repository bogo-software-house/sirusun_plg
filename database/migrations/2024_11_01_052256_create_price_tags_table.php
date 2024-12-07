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
        Schema::create('price_tags', function (Blueprint $table) {
            $table->id();
            $table->string('custom_id')->unique();
            $table->string('rusuns_custom_id');
            $table->string('bloks_custom_id');
            $table->string('floors_custom_id');
            $table->string('prices_custom_id');
            $table->timestamps();

            //relasi
            $table->foreign('rusuns_custom_id')->references('custom_id')->on('rusuns')->onDelete('cascade');
            $table->foreign('bloks_custom_id')->references('custom_id')->on('bloks')->onDelete('cascade');
            $table->foreign('floors_custom_id')->references('custom_id')->on('floors')->onDelete('cascade');
            $table->foreign('prices_custom_id')->references('custom_id')->on('prices')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    
        Schema::dropIfExists('price_tags');

    }
};
