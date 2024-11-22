<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Education;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Education>
 */
class EducationFactory extends Factory
{
     protected $model = Education::class;

    public function definition()
    {

        return [
            'custom_id' => $this->faker->unique()->word,
            'education' => $this->faker->word, // Nama pendidikan
        ];
    }
}
