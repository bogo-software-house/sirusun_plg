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
        $count = Status::count() + 1;
        $customId = sprintf("IS%03d", $count); // Format ID, misalnya "IS001"
        return [
            'custom_id' => $customId,
            'status' => $this->faker->word, // Nama status
        ];
    }
}
