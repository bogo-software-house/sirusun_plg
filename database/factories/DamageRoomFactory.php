<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\DamageRoom;
use App\Models\Property;
use App\Models\Condition;
use App\Models\Information;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DamageRoom>
 */
class DamageRoomFactory extends Factory
{
   
    public function definition()
    {
        return [
            'custom_id' => $this->faker->word,
            'properties_custom_id' => Property::pluck('custom_id')->random(), // Mengambil random dari property yang sudah ada
            'conditions_custom_id' => Condition::pluck('custom_id')->random(), // Mengambil random dari condition yang sudah ada
            'information_custom_id' => Information::pluck('custom_id')->random(), // Mengambil random dari information yang sudah ada
        ];
    }
}
