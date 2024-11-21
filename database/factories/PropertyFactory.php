<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Property;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    protected $model = Property::class;

    public function definition()
    {
        $count = Property::count() + 1;
        $customId = sprintf("IPR%03d", $count); // Format ID, misalnya "IPR001"
        
        return [
            'custom_id' => $customId,
            'property' => $this->faker->word, // Nama properti
        ];
    }
}
