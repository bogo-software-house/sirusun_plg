<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\StatusNikah;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StatusNikah>
 */
class StatusNikahFactory extends Factory
{
    protected $model = StatusNikah::class;

    public function definition()
    {
        return [
            'custom_id' => $this->faker->unique()->word,
            'status_nikah' => $this->faker->word, // Status pernikahan
        ];
    }
}
