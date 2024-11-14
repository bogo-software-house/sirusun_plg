<?php

namespace Database\Factories;

use App\Models\Religion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Religion>
 */
class ReligionFactory extends Factory
{
     protected $model = Religion::class;

    public function definition()
    {
        static $usedReligions = [];
        $allReligions = [
            'Islam',
            'Kristen',
            'Katholik', 
            'Hindu', 
            'Buddha', 
            'Konghucu'
        ];

    $availableReligions = array_diff($allReligions, $usedReligions);
    
    if (empty($availableReligions)) {
        $usedReligions = []; // Reset jika semua sudah digunakan
        $availableReligions = $allReligions;
    }

    $selectedReligion = $this->faker->unique()->randomElement($availableReligions);
    $usedReligions[] = $selectedReligion;

    $count = Religion::count() + 1;
    $customId = sprintf("IRL%03d", $count);

    return [
        'custom_id' => $customId,
        'religions' => $selectedReligion
    ];
    }
}
