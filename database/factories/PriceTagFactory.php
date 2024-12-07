<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PriceTag;
use App\Models\Rusun;
use App\Models\Blok;
use App\Models\Floor;
use App\Models\Price;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PriceTagFactory extends Factory
{

    protected $model = PriceTag::class;

    public function definition()
    {
        return [
            'custom_id' => $this->faker->unique()->word(),
            'rusuns_custom_id'=> Rusun::pluck('custom_id')->random(),
            'bloks_custom_id' => Blok::pluck('custom_id')->random(),
            'floors_custom_id'=> Floor::pluck('custom_id')->random(),
            'prices_custom_id' => Price::pluck('custom_id')->random(),

        ];
    }
}
