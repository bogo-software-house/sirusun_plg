<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Information;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Information>
 */
class InformationFactory extends Factory
{
    protected $model = Information::class;

    public function definition()
    {

        
        return [
            'custom_id' => $this->faker->unique()->word,
            'information' => $this->faker->word, // Keterangan Kondisi Kerusakan
        ];
    }
}
