<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Gender;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Gender>
 */
class GenderFactory extends Factory
{
      protected $model = Gender::class;

    public function definition()
    {
        return [
            'custom_id' => $this->faker->unique()->word,
            'gender' => $this->faker->word, // Jenis kelamin
        ];
    }
}
