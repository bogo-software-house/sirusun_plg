<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Role;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    protected $model = Role::class;
    
    public function definition()
    {
        // $count = Price::count() + 1;
        // $customId = sprintf("IRL%03d", $count); // Format ID, misalnya "IPR001"

        return   [   
            'custom_id' => $this->faker->unique()->randomElement(['IRL001', 'IRL002']), // Menggunakan elemen acak
            'leveluser' => $this->faker->randomElement(['admin', 'user']), // Menggunakan elemen acak
        ];
    }
}
