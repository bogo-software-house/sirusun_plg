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
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->string('custom_id')->unique();
            $table->string('Name');
            $table->string('Place_of_birth');
            $table->date('Date_of_birth');
            $table->unsignedBigInteger('id_gender');
            $table->foreign('id_gender')->references('id')->on('genders');
            $table->string('Citizenship'); 
            $table->string('Home_Address');
            $table->string('Phone_Number');
            $table->string('Work');

            //id_berkas_scan_kk
            $table->unsignedBigInteger('id_berkas_scan_kk');
            $table->foreign('id_berkas_scan_kk')->references('id')->on('berkas_scan_kks');

            $table->string('No_Ktp');

            //id_status_perkawinan
            $table->unsignedBigInteger('id_married_status');
            $table->foreign('id_married_status')->references('id')->on('married_statuses');

            //id_agama
            $table->unsignedBigInteger('id_agama');
            $table->foreign('id_agama')->references('id')->on('agamas');

            //id_pendidikan
            $table->unsignedBigInteger('id_pendidikan');
            $table->foreign('id_pendidikan')->references('id')->on('educations');

            $table->string('Penghasilan');

            //id_berkas_scan_ktp
            $table->unsignedBigInteger('id_berkas_scan_ktp');
            $table->foreign('id_berkas_scan_ktp')->references('id')->on('berkas_scan_ktps');

            $table->string('Alamat_Tempat_Kerja');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
