<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Price;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Price>
 */
class PriceFactory extends Factory
{
    protected $model = Price::class;
    
    public function definition()
    {
        $count = Price::count() + 1;
        $customId = sprintf("IPR%03d", $count); // Format ID, misalnya "IPR001"

        return [
            'custom_id' => $customId,
            'price' => $this->faker->randomFloat(2, 100, 1000), // Harga barang
        ];
    }
}
