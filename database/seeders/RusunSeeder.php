<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage; // Import Storage Facade

class RusunSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

       // Buat folder 'images' jika belum ada
         if (!Storage::disk('public')->exists('images')) {
             Storage::disk('public')->makeDirectory('images');
         }

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
                 'image1' => $this->uploadImage('kertapati1.jpeg'),
                 'image2' => $this->uploadImage('kertapati2.jpeg'),
                 'image3' => $this->uploadImage('kertapati3.jpeg'),
                 'image4' => $this->uploadImage('kertapati4.jpeg'),
                 'kordinat' => '-2.957860572269894, 104.73234950025018',
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
                 'image1' => $this->uploadImage('kasnariansyah1.jpeg'),
                 'image2' => $this->uploadImage('kasnariansyah2.jpeg'),
                 'image3' => $this->uploadImage('kasnariansyah3.jpeg'),
                 'image4' => $this->uploadImage('kasnariansyah4.jpeg'),
                 'kordinat' => '-3.0857796976959277, 104.72633872204534',

             ],
         )->create();
     }

     private function uploadImage($filename)
     {
         // Path ke gambar sumber
         $sourcePath = public_path('gambar/' . $filename);

        // Unggah gambar ke storage (menggunakan putFile untuk mengunggah isi file)
         $imagePath = Storage::disk('public')->putFile('images', $sourcePath);
         // Kembalikan path gambar yang disimpan di storage
         return $imagePath;
     }

}
