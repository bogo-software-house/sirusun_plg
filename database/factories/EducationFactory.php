<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Education;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Education>
 */
class EducationFactory extends Factory
{
     protected $model = Education::class;

    public function definition()
    {
        $count = Education::count() + 1;
        $customId = sprintf("IED%03d", $count); // Format ID, misalnya "IED001"

        return [
            'custom_id' => $customId,
            'education' => $this->faker->word, // Nama pendidikan
        ];
    }
}
