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
        Schema::create('report_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_custom_id');
             $table->unsignedTinyInteger('bulan');
            $table->unsignedSmallInteger('tahun');
            $table->text('kondisi_sebelumnya');
            $table->text('kondisi_setelahnya');
            $table->timestamps();

            $table->foreign('room_custom_id')->references('custom_id')->on('rooms')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_rooms');
    }
};
