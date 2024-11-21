<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Information;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Information>
 */
class InformationFactory extends Factory
{
    protected $model = Information::class;

    public function definition()
    {
        $count = Information::count() + 1;
        $customId = sprintf("IFD%03d", $count); // Format ID, misalnya "IFD001"
        
        return [
            'custom_id' => $customId,
            'information' => $this->faker->name, // Nama
        ];
    }
}
