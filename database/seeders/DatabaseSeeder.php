<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Blok;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

   public function run()
{
    \App\Models\Religion::factory()->count(6)->sequence(
        ['custom_id' => 'IRL001','religions' => 'Islam'],
        ['custom_id' => 'IRL002','religions' => 'Kristen'],
        ['custom_id' => 'IRL003','religions' => 'Katholik'],
        ['custom_id' => 'IRL004','religions' => 'Hindu'],
        ['custom_id' => 'IRL005','religions' => 'Buddha'],
        ['custom_id' => 'IRL006','religions' => 'Konghucu'],
    )->create();

    \App\Models\Education::factory()->count(5)->sequence(
        ['custom_id' => 'IED001','education' => 'SD'],
        ['custom_id' => 'IED002','education' => 'SMP'],
        ['custom_id' => 'IED003','education' => 'SMA'],
        ['custom_id' => 'IED004','education' => 'S1'],
        ['custom_id' => 'IED005','education' => 'S3'],
    )->create();

     \App\Models\Gender::factory()->count(2)->sequence(
        ['custom_id' => 'IGD001','gender' => 'Laki-Laki'],
        ['custom_id' => 'IGD002','gender' => 'Perempuan'],
     )->create();

     \App\Models\StatusNikah::factory()->count(4)->sequence(
        ['custom_id' => 'ISN001','status_nikah' => 'Belum Menikah'],
        ['custom_id' => 'ISN002','status_nikah' => 'Menikah'],
        ['custom_id' => 'ISN003','status_nikah' => 'Cerai Hidup'],
        ['custom_id' => 'ISN004','status_nikah' => 'Cerai Mati'],
     )->create();

    \App\Models\StatusForm::factory()->count(3)->sequence(
        ['custom_id' => 'ISF001','status' => 'DI PROSES'],
        ['custom_id' => 'ISF002','status' => 'DITERIMA'],
        ['custom_id' => 'ISF003','status' => 'DITOLAK'],    )
    ->create();

    \App\Models\Role::factory()->count(2)
    ->sequence(
        ['custom_id' =>'IRO001','leveluser' => 'admin'],
        ['custom_id' =>'IRO002','leveluser' => 'user'], 
    )
    ->create();

    \App\Models\Blok::factory()->count(4)
    ->sequence(
        ['custom_id' =>'IBO001','blok' => 'A'],
        ['custom_id' =>'IBO002','blok' => 'B'], 
        ['custom_id' =>'IBO003','blok' => 'C'], 
        ['custom_id' =>'IBO004','blok' => 'D'], 
    )
    ->create();
    
    \App\Models\Condition::factory()->count(4)
    ->sequence(
        ['custom_id' =>'ICD001','condition' => 'Baik'],
        ['custom_id' =>'ICD002','condition' => 'Rusak Ringan'], 
        ['custom_id' =>'ICD003','condition' => 'Rusak Sedang'], 
        ['custom_id' =>'ICD004','condition' => 'Rusak Berat'], 
    )
    ->create();

    \App\Models\Property::factory()->count(8)
    ->sequence(
        ['custom_id' =>'IPR001','property' => 'Lantai'],
        ['custom_id' =>'IPR002','property' => 'Kusen'], 
        ['custom_id' =>'IPR003','property' => 'Pintu'], 
        ['custom_id' =>'IPR004','property' => 'Jendela'],
        ['custom_id' =>'IPR005','property' => 'Finishing Platfond'], 
        ['custom_id' =>'IPR006','property' => 'Finishing Dinding'],
        ['custom_id' =>'IPR007','property' => 'Instalasi Listrik'],
        ['custom_id' =>'IPR008','property' => 'Instalasi Air'],
    )
    ->create();

    \App\Models\Status::factory()->count(2)
    ->sequence(
        ['custom_id' =>'IST001','status' => 'Tersedia'],
        ['custom_id' =>'IST002','status' => 'Terisi'], 
    )
    ->create();
    
    \App\Models\Price::factory()->count(13)
    ->sequence(
        ['custom_id' =>'IPR001','price' => 430000],
        ['custom_id' =>'IPR002','price' => 380000], 
        ['custom_id' =>'IPR003','price' => 375000], 
        ['custom_id' =>'IPR004','price' => 350000],
        ['custom_id' =>'IPR005','price' => 340000], 
        ['custom_id' =>'IPR006','price' => 325000], 
        ['custom_id' =>'IPR007','price' => 310000], 
        ['custom_id' =>'IPR008','price' => 290000], 
        ['custom_id' =>'IPR009','price' => 285000], 
        ['custom_id' =>'IPR010','price' => 280000],
        ['custom_id' =>'IPR011','price' => 260000], 
        ['custom_id' =>'IPR012','price' => 255000], 
        ['custom_id' =>'IPR013','price' => 195000], 
    )
    ->create();

    \App\Models\Floor::factory()->count(5)
    ->sequence(
        ['custom_id' => 'IFL001', 'floor' => 0, 'prices_custom_id' => 'IPR001'],
        ['custom_id' => 'IFL002', 'floor' => 1, 'prices_custom_id' => 'IPR002'],
        ['custom_id' => 'IFL003', 'floor' => 2, 'prices_custom_id' => 'IPR003'],
        ['custom_id' => 'IFL004', 'floor' => 3, 'prices_custom_id' => 'IPR004'],
        ['custom_id' => 'IFL005', 'floor' => 4, 'prices_custom_id' => 'IPR005']
    )
    ->create();

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
