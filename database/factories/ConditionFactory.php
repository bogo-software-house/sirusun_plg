<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Condition;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Condition>
 */
class ConditionFactory extends Factory
{
    protected $model = Condition::class;
  
    public function definition()
    {


        return [
            'custom_id' => $this->faker->unique()->word,
            'condition' => $this->faker->word, // Kondisi yang dapat ditemukan
        ];
    }
}
