<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Blok;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blok>
 */
class BlokFactory extends Factory
{
    protected $model = Blok::class;

    public function definition()
    {
        $customId = ['IB001', 'IB002', 'IB003', 'IB004'];
        $pilihcustomid = $this->faker->randomElement($customId);
        $blok = ['A','B','C','D'];
        $pilihblok = $this->faker->randomElement($blok);

        return [
            'custom_id' => $pilihcustomid,
            'blok' => $pilihblok,
        ];
    }
}