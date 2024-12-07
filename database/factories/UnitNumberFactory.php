<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\UnitNumber;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UnitNumber>
 */
class UnitNumberFactory extends Factory
{
    protected $model = UnitNumber::class;

    public function definition()
    {

        return [
            'custom_id' => $this->faker->unique()->word,
            'no_unit' => $this->faker->word // Nomor Unit

        ];
    }
}
