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
    \App\Models\Religion::factory()->create();
    \App\Models\Education::factory()->create();
    \App\Models\Gender::factory()->create();
    \App\Models\StatusNikah::factory()->create();
    \App\Models\StatusForm::factory()->create();

    //Blok::factory()->count(4)->create();
    // \App\Models\Condition::factory()->create();
    // \App\Models\Price::factory()->create();
    // \App\Models\Status::factory()->create();
    // \App\Models\Property::factory()->create();
    // \App\Models\Information::factory()->create();
}

}
