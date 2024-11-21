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
        $count = UnitNumber::count() + 1;
        $customId = sprintf("UN%03d", $count); // Format ID, misalnya "UN001"
        return [
            'custom_id' => $customId,
            'no_unit' => $this->faker->numberBetween(1, 1000), // Nomor unit
        //     'bloks_custom_id',
        // 'floors_custom_id',
        ];
    }
}
