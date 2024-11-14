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
        $count = StatusNikah::count() + 1;
        $customId = sprintf("ISN%03d", $count); // Format ID, misalnya "ISN001"

        return [
            'custom_id' => $customId,
            'status_nikah' => $this->faker->word, // Status pernikahan
        ];
    }
}
