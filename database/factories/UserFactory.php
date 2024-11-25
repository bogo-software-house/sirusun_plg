<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Role;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class UserFactory extends Factory
{
     protected $model = User::class;

    public function definition()
    {
       
        return [
            'custom_id' => $this->faker->word,
            'nik' => $this->faker->unique()->numerify('##########'), // Nomor unit
            'username' => $this->faker->word, // Nomor unit
            'password' => bcrypt('password'),  // Password default, bisa diubah
            'transaksi_custom_id' => null,
            'roles_custom_id' => Role::pluck('custom_id')->random(),  // Mengambil random dari role yang sudah ada
            'remember_token' => null,
        //     'bloks_custom_id',
        // 'floors_custom_id',
        ];
    }
}
