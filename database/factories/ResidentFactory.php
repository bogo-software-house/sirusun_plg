<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Resident;
use App\Models\Gender;
use App\Models\StatusNikah;
use App\Models\Religion;
use App\Models\Education;
use App\Models\Salary;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resident>
 */
class ResidentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nik' => $this->faker->unique()->numerify('################'), 
            'username' => $this->faker->userName(),
            'tempat_lahir' => $this->faker->city(),
            'tanggal_lahir' => $this->faker->date(),
            'genders_custom_id' => Gender::pluck('custom_id')->random(), 
            'status_nikah_custom_id' => StatusNikah::pluck('custom_id')->random(), 
            'religions_custom_id' => Religion::pluck('custom_id')->random(), 
            'education_custom_id' => Education::pluck('custom_id')->random(), 
            'alamat_rumah' => $this->faker->address(),
            'no_telp' => $this->faker->phoneNumber(),
            'salaries_custom_id' => Salary::pluck('custom_id')->random(), 
            'warga_negara' => $this->faker->country(),
            'pekerjaan' => $this->faker->jobTitle(),
            'alamat_tempat_kerja' => $this->faker->address(),
            'email' => $this->faker->email(),
        ];
    }
}
