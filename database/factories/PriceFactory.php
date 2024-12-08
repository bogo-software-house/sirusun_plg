<?php

namespace Database\Factories;

use App\Models\Price;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Price>
 */

class PriceFactory extends Factory
{
    protected $model = Price::class;

    public function definition()
    {


        return [
            'custom_id' => $this->faker->unique()->word,
            'price' => $this->faker->numberBetween(100000, 500000),  // Menghasilkan harga sebagai angka integer
        ];
    }
}
