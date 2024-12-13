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
        Schema::create('transaction_histories', function (Blueprint $table) {
           $table->id();
            $table->string('custom_id')->unique();
            $table->string('model_type'); // e.g., TransactionRoom, TransactionStatusForm
            $table->string('model_id'); // ID of the related model
            $table->string('action'); // e.g., 'created', 'updated', 'deleted'
            $table->json('old_data')->nullable(); // Previous state of the record
            $table->json('new_data')->nullable(); // New state of the record
            $table->string('user_id')->nullable(); // Who performed the action
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_histories');
    }
};
