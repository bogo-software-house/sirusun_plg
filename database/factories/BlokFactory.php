<?php

namespace Database\Factories;

use App\Models\Blok;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blok>
 */
class BlokFactory extends Factory
{
    protected $model = Blok::class;

    public function definition()
    {


        return [
            'custom_id' => $this->faker->unique()->word,
            'blok' =>  $this->faker->word, //blok
        ];
    }
}