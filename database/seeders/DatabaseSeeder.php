<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Blok;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

   public function run()
{
    \App\Models\Religion::factory()->count(6)->sequence(
        ['custom_id' => 'IRL001','religions' => 'Islam'],
        ['custom_id' => 'IRL002','religions' => 'Kristen'],
        ['custom_id' => 'IRL003','religions' => 'Katholik'],
        ['custom_id' => 'IRL004','religions' => 'Hindu'],
        ['custom_id' => 'IRL005','religions' => 'Buddha'],
        ['custom_id' => 'IRL006','religions' => 'Konghucu'],
    )->create();

    \App\Models\Education::factory()->count(5)->sequence(
        ['custom_id' => 'IED001','education' => 'SD'],
        ['custom_id' => 'IED002','education' => 'SMP'],
        ['custom_id' => 'IED003','education' => 'SMA'],
        ['custom_id' => 'IED004','education' => 'S1'],
        ['custom_id' => 'IED005','education' => 'S3'],
    )->create();

     \App\Models\Gender::factory()->count(2)->sequence(
        ['custom_id' => 'IGD001','gender' => 'Laki-Laki'],
        ['custom_id' => 'IGD002','gender' => 'Perempuan'],
     )->create();

     \App\Models\StatusNikah::factory()->count(4)->sequence(
        ['custom_id' => 'ISN001','status_nikah' => 'Belum Menikah'],
        ['custom_id' => 'ISN002','status_nikah' => 'Menikah'],
        ['custom_id' => 'ISN003','status_nikah' => 'Cerai Hidup'],
        ['custom_id' => 'ISN004','status_nikah' => 'Cerai Mati'],
     )->create();

    \App\Models\StatusForm::factory()->count(3)->sequence(
        ['custom_id' => 'ISF001','status' => 'DI PROSES'],
        ['custom_id' => 'ISF002','status' => 'DITERIMA'],
        ['custom_id' => 'ISF003','status' => 'DITOLAK'],    )
    ->create();

    \App\Models\Role::factory()->count(2)
    ->sequence(
        ['custom_id' =>'IRO001','leveluser' => 'admin'],
        ['custom_id' =>'IRO002','leveluser' => 'user'], 
    )
    ->create();

    //Blok::factory()->count(4)->create();
    // \App\Models\Condition::factory()->create();
    // \App\Models\Price::factory()->create();
    // \App\Models\Status::factory()->create();
    // \App\Models\Property::factory()->create();
    // \App\Models\Information::factory()->create();
}

}
