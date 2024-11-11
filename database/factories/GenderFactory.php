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
        $count = Gender::count() + 1;
        $customId = sprintf("IGD%03d", $count); // Format ID, misalnya "IGD001"

        return [
            'custom_id' => $customId,
            'gender' => $this->faker->word, // Jenis kelamin
        ];
    }
}
