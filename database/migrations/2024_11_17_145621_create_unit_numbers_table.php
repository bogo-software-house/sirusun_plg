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
        Schema::create('unit_numbers', function (Blueprint $table) {
            $table->id();
            $table->string('custom_id')->unique();
            $table->string('no_unit'); //max 30 unit
            $table->string('bloks_custom_id');
            $table->string('floors_custom_id');
            $table->timestamps();

            // Foreign Key Constraints
            $table->foreign('bloks_custom_id')->references('custom_id')->on('bloks')->onDelete('cascade');
            $table->foreign('floors_custom_id')->references('custom_id')->on('floors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unit_numbers');
    }
};
