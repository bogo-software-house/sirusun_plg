<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Status;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Status>
 */
class StatusFactory extends Factory
{
    protected $model = Status::class;

    public function definition()
    {


        return [
            'custom_id' => $this->faker->unique()->word,
            'status' => $this->faker->word, // status kamar
        ];
    }
}
