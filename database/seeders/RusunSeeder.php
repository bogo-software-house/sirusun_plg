<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RusunSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Rusun::factory()->count(2)->sequence(
        [
            'custom_id' => 'IRN001',
            'nama_rusun' => 'Kertapati',
            'alamat' => 'Simpang Tinju',
            'luas' => 200,
            'blok' => 3,
            'lantai' => 5,
            'tahun_pembangunan' => 2003,
            'fasilitas' => 'Tempat Parkir',
            'image1' => '/karnariansya1.jpg',
            'image2' => '/karnariansya2.jpg',
            'image3' => '/karnariansya3.jpg',
            'image4' => '/karnariansya4.jpg',
        ],
        [
            'custom_id' => 'IRN002',
            'nama_rusun' => 'Kasnariansyah',
            'alamat' => 'Gajah Mada',
            'luas' => 300,
            'blok' => 4,
            'lantai' => 5,
            'tahun_pembangunan' => 2002,
            'fasilitas' => 'Tempat Parkir',
            'image1' => '/karnariansya1.jpg',
            'image2' => '/karnariansya2.jpg',
            'image3' => '/karnariansya3.jpg',
            'image4' => '/karnariansya4.jpg',
        ],
    )->create();
    }
}
