<?php

namespace Database\Factories;

use App\Models\Religion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Religion>
 */
class ReligionFactory extends Factory
{
     protected $model = Religion::class;

    public function definition()
    {



    return [
        'custom_id' =>  $this->faker->unique()->word,
        'religions' =>  $this->faker->word
    ];
    }
}
