<?php

namespace Database\Factories;

use App\Models\StatusForm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StatusForm>
 */
class StatusFormFactory extends Factory
{
   protected $model = StatusForm::class;

    public function definition()
    {
        // Hitung jumlah entri yang ada di tabel untuk menentukan nomor berikutnya
        $count = StatusForm::count() + 1;
        $customId = sprintf("ISF%03d", $count); // Format ID, misalnya "IRL001"

        return [
            'custom_id' => $customId,
            'status' => $this->faker->word, // Nama agama
        ];
    }
}
