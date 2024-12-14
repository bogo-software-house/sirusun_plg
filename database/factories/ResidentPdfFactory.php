<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ResidentPdf>
 */
class ResidentPdfFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'custom_id' => $this->faker->unique()->word(),
            'file_name' => $this->faker->optional()->fileName(),  // Randomly return null or file name
            'file_path' => $this->faker->optional()->filePath(),  // Randomly return null or file path
            'file_url' => $this->faker->optional()->fileUrl()      // Randomly return null or file URL    
        ];
    }
}
