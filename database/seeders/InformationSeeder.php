<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       \App\Models\Information::factory()->count(32)
    ->sequence(
        ['custom_id' =>'IIF001','information' => 'Lantai dalam kondisi baik'],
        ['custom_id' =>'IIF002','information' => 'Penutup lantai retak/remuk sebagian'], 
        ['custom_id' =>'IIF003','information' => 'Penutup lantai lepas sebagian'], 
        ['custom_id' =>'IIF004','information' => 'Penutup lantai sebagian besar terlepas'],
        ['custom_id' =>'IIF005','information' => 'Kusen dalam kondisi baik'], 
        ['custom_id' =>'IIF006','information' => 'Aluminium/ UPVC sebagian kecil terlihat retak dan gompal / berlubang akibat benturan'], 
        ['custom_id' =>'IIF007','information' => 'Aluminium/ UPVC sebagian banyak terlihat retak dan gompal / berlubang akibat benturan terjadi deformasi/melengkung'], 
        ['custom_id' =>'IIF008','information' => 'Aluminium/ UPVC  terjadi deformasi/melengkung sehingga tidak bisa menutup pintu'], 
        ['custom_id' =>'IIF009','information' => 'Pintu dalam kondisi baik'],
        ['custom_id' =>'IIF010','information' => 'Kayu terlihat lapuk/keropos pada sebagian kecil pintu'],
        ['custom_id' =>'IIF011','information' => 'Kayu terlihat lapuk/keropos/ berlubang semakin meluas, handle dan kunci tidak berfungsi dengan baik'],
        ['custom_id' =>'IIF012','information' => 'Kayu terlihat rangka pintu patah, sambungan terlepas, multiplek penutup pintu terlepas/berlubang, handle dan kunci tidak ada'],
        ['custom_id' =>'IIF013','information' => 'Jendela dalam kondisi baik'],
        ['custom_id' =>'IIF014','information' => 'Terlihat lapuk/keropos, retak/gompal akibat benturan pada bingkai jendela'],
        ['custom_id' =>'IIF015','information' => 'Terlihat lapuk/keropos, retak/gompal semakin meluas, engsel dan kunci tidak berfungsi dengan baik sehingga jendela tidak dapat menutup dengan sempurna'],
        ['custom_id' =>'IIF016','information' => 'Terlihat pada bingkai jendela terjadi deformasi/melengkung/lepas sambungan sehingga jendela sulit dibuka'],
        ['custom_id' =>'IIF017','information' => 'Finishing Plafond dalam kondisi baik'],
        ['custom_id' =>'IIF018','information' => 'Perubahan warna pada lapisan cat plafond semakin meluas'],
        ['custom_id' =>'IIF019','information' => 'Terlihat retak pada sebagian sambungan plafond. Lapisan cat plafond terkelupas sebagian'],
        ['custom_id' =>'IIF020','information' => 'Retak pada sambungan plafond semakin meluas. Lapisan cat plafond terkelupas meluas dan berlumut '],
        ['custom_id' =>'IIF021','information' => 'Finishing Dinding dalam kondisi baik'],
        ['custom_id' =>'IIF022','information' => 'Perubahan warna pada lapisan cat plafond semakin meluas'],
        ['custom_id' =>'IIF023','information' => 'Plesteran retak sebagian, lapisan cat terkelupas sebagian'],
        ['custom_id' =>'IIF024','information' => 'Plesteran terkelupas meluas, lapisan cat terkelupas meluas dan berlumut'],
        ['custom_id' =>'IIF025','information' => 'Jaringan listrik dalam kondisi baik'],
        ['custom_id' =>'IIF026','information' => 'Beberapa komponen dari panel-panel  rusak, sebagian kecil jalur kabel instalasi shortage sehingga armature rusak ringan sehingga biaya perbaikan 10%-25% dari biaya instalasi baru'],
        ['custom_id' =>'IIF027','information' => 'Beberapa komponen dari panel-panel listrik rusak, sebagian kecil jalur kabel instalasi shortage sehingga armature rusak berat dan ringan sehingga biaya perbaikan 25%-50% dari biaya instalasi baru'],
        ['custom_id' =>'IIF028','information' => 'Beberapa komponen dari panel-panel listrik rusak, sebagian besar jalur kabel instalasi shortage sehingga armature rusak sehingga biaya perbaikan 50%-65% dari biaya instalasi baru'],
        ['custom_id' =>'IIF029','information' => 'Sistem penyediaan air dalam kondisi baik'],
        ['custom_id' =>'IIF030','information' => 'Bagian-bagian kecil pemipaan bocor, motor pompa terbakar, kran-kran kecil rusak sehingga biaya perbaikan antara 10%-25% dari biaya instalasi baru'],
        ['custom_id' =>'IIF031','information' => 'Pompa, motor, pipa, kran rusak, apabila diganti memerlukan biaya 25%-50% dari biaya instalasi baru'],
        ['custom_id' =>'IIF032','information' => 'Sebagian besar pompa, sebagian besar motor terbakar, pipa utama bocor namun di tempat terbuka, beberapa kran tidak berfungsi sehingga biaya perbaikan antara 50%-65% dari biaya instalasi baru']
    )
    ->create();
    }
}
