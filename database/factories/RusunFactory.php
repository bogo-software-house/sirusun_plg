<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Rusun;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rusun>
 */
class RusunFactory extends Factory
{
    protected $model = Rusun::class;

    public function definition()
    {
        return [
            'custom_id' => $this->faker->unique()->word(),
            'nama_rusun' => $this->faker->randomElement(['Kertapati', 'Kasnariansyah']),
            'alamat' => $this->faker->randomElement(['Simpang Tinju', 'Gajah Mada']),
            'luas' => $this->faker->randomFloat(2, 200, 300), 
            'blok' => $this->faker->randomElement(['A', 'B', 'C', 'D']),
            'lantai' => $this->faker->randomElement([0, 1, 2, 3, 4]),
            'tahun_pembangunan' => $this->faker->randomElement([2002, 2003]),
            'fasilitas' => $this->faker->randomElement(['Tempat Parkir']),
            'image1' => $this->faker->randomElement(['Tempat Parkir']),
            'image2' => $this->faker->randomElement(['Tempat Parkir']),
            'image3' => $this->faker->randomElement(['Tempat Parkir']),
            'image4' => $this->faker->randomElement(['Tempat Parkir']),
            'image4' => $this->faker->randomElement(['Tempat Parkir']),
        ];
    }
}
