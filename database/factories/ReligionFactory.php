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
        // Hitung jumlah entri yang ada di tabel untuk menentukan nomor berikutnya
        $count = Religion::count() + 1;
        $customId = sprintf("IRL%03d", $count); // Format ID, misalnya "IRL001"

        return [
            'custom_id' => $customId,
            'religions' => $this->faker->word, // Nama agama
        ];
    }
}
