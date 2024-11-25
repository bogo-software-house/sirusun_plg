<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Room::factory()->count()->sequence(
        [   'custom_id' => 'IRO001', 
            'unit_numbers_custom_id' => 'IUN001', 
            'price_tags_custom_id' => 'IRO001',
            'statuses_custom_id' => 'IST002',
            'damage_rooms_custom_id' => 'IDR010'
        ],
        //nah ini tambahannya yg lainnya nanti diisini 
        )->create();
    }
}
