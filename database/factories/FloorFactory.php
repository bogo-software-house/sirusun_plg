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

        

        return [
            'custom_id' => $this->faker->unique()->bothify('IFL###'),  // ID unik untuk floor
            'floor' => $this->faker->numberBetween(0, 4),  // Nomor lantai (0, 1, 2, 3, 4)

        ];
    }
}
