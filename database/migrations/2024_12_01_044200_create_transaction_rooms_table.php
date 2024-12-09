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
        Schema::create('transaction_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('custom_id')->unique();
            $table->bigInteger('nik');
            $table->string('users_custom_id');
            $table->string('rooms_custom_id');
            $table->timestamps();

            $table->foreign('rooms_custom_id')->references('custom_id')->on('rooms')->onDelete('cascade');
            $table->foreign('users_custom_id')->references('custom_id')->on('users')->onDelete('cascade');
            $table->foreign('nik')->references('nik')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_rooms');
    }
};
