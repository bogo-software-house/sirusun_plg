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
        $count = Condition::count() + 1;
        $customId = sprintf("IC%03d", $count); // Format ID, misalnya "IC001"

        return [
            'custom_id' => $customId,
            'condition' => $this->faker->word, // Kondisi yang dapat ditemukan
        ];
    }
}
