<?php

namespace Database\Factories;

use App\Models\StatusForm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StatusForm>
 */
class StatusFormFactory extends Factory
{
   protected $model = StatusForm::class;

    public function definition()
    {
   
        return [
            'custom_id' => $this->faker->unique()->word,
            'status' => $this->faker->word, // Nama agama
        ];
    }
}
