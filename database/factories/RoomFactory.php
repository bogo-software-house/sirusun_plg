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
            'damage_rooms_lantai_custom_id' => DamageRoom::pluck('custom_id')->random(),
            'damage_rooms_kusen_custom_id' => DamageRoom::pluck('custom_id')->random(),
            'damage_rooms_pintu_custom_id' => DamageRoom::pluck('custom_id')->random(),
            'damage_rooms_jendela_custom_id' => DamageRoom::pluck('custom_id')->random(),
            'damage_rooms_fn-flatfond_custom_id' => DamageRoom::pluck('custom_id')->random(),
            'damage_rooms_fn-dinding_custom_id' => DamageRoom::pluck('custom_id')->random(),
            'damage_rooms_instalasi-listrik_custom_id' => DamageRoom::pluck('custom_id')->random(),
            'damage_rooms_instalasi-air_custom_id' => DamageRoom::pluck('custom_id')->random(),
        ];
    }
}
