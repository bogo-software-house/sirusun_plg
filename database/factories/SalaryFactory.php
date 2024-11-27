<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Salary;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Salary>
 */
class SalaryFactory extends Factory
{
     protected $model = Salary::class;

    public function definition()
    {


        
    return [
        'custom_id' =>  $this->faker->unique()->word,
        'salary' =>  $this->faker->word
    ];
    }
}
