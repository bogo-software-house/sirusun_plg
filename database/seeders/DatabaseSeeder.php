<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

   public function run()

    {
        \App\Models\Religion::factory()->count(5)->create();
        \App\Models\Education::factory()->create();
        \App\Models\Gender::factory()->create();
        \App\Models\StatusNikah::factory()->create();
        \App\Models\StatusForm::factory()->create();
    }

}
