<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Floor;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Floor>
 */
class FloorFactory extends Factory
{
    protected $model = Floor::class;

    public function definition()
    {

        $count = Floor::count() + 1;
        $customId = sprintf("IF%03d", $count); // Format ID, misalnya "IF001"
        
        return [
            'custom_id' => $customId,
            'floor' => $this->faker->numberBetween(1, 100), // Nomor lantai
            'prices_custom_id' => Price::factory()->create()->custom_id,
        ];
    }
}
