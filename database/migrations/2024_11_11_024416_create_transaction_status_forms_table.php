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
        Schema::create('transaction_status_forms', function (Blueprint $table) {
            $table->id();
            $table->string('form_custom_id');
            $table->string('statusForm_custom_id');
            $table->timestamps();


            // Foreign key constraint
            $table->foreign('form_custom_id')->references('custom_id')->on('resident_pdfs')->onDelete('cascade');
            $table->foreign('statusForm_custom_id')->references('custom_id')->on('status_forms')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_status_forms');
    }
};
