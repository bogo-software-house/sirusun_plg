<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Room;
use App\Models\UnitNumber;
use App\Models\PriceTag;
use App\Models\Status;
use App\Models\DamageRoom;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    public function definition()
    {
        return [
            'custom_id' => $this->faker->word,
            'unit_numbers_custom_id' => UnitNumber::pluck('custom_id')->random(),
            'price_tags_custom_id' => PriceTag::pluck('custom_id')->random(),
            'statuses_custom_id' => Status::pluck('custom_id')->random(),
            'damage_rooms_custom_id' => DamageRoom::pluck('custom_id')->random(),
        ];
    }
}
