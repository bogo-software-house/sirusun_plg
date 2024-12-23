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
        Schema::create('resident_pdfs', function (Blueprint $table) {
            $table->id();
             $table->bigInteger('nik')->default(16)->unique(); // NIK sebagai foreign key
              $table->string('custom_id')->unique(); // Kolom untuk menyimpan ID kustom
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_url');
            $table->timestamps();
     

            // Foreign key constraint
            $table->foreign('nik')->references('nik')->on('residents')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resident_pdfs');
    }
};
