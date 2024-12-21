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
        ['custom_id' => 'ISF003','status' => 'DITOLAK'],    
    )->create();
   
    \App\Models\Salary::factory()->count(3)->sequence(
        ['custom_id' => 'ISY001','salary' => ' < 5.000.000'],
        ['custom_id' => 'ISY002','salary' => '5.000.000 - 10.000.000'],
        ['custom_id' => 'ISY003','salary' => '> 10.000.000'],    
    )->create();

    \App\Models\Role::factory()->count(3)->sequence(
        ['custom_id' =>'IRO001','leveluser' => 'admin'],
        ['custom_id' =>'IRO002','leveluser' => 'user'], 
        ['custom_id' =>'IRO003','leveluser' => 'staff'], 
    )
    ->create();

    \App\Models\User::factory()->count(2)->sequence(
    [
        'custom_id' => 'IUS001',
        'username' => 'admin', 
        'password' => bcrypt('admin123'), 
        'roles_custom_id' => 'IRO001'  // Menggunakan role admin yang sudah ada
    ],
    [
        'custom_id' => 'IUS002',
        'username' => 'staff', 
        'password' => bcrypt('staff123'), 
        'roles_custom_id' => 'IRO003'  // Menggunakan role admin yang sudah ada
    ],
    )->create();
    
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

    
    \App\Models\Blok::factory()->count(4)
    ->sequence(
        ['custom_id' =>'IBO001','blok' => 'A'],
        ['custom_id' =>'IBO002','blok' => 'B'], 
        ['custom_id' =>'IBO003','blok' => 'C'], 
        ['custom_id' =>'IBO004','blok' => 'D'], 
    )
    ->create();
    
    \App\Models\Price::factory()->count(14)
    ->sequence(
        ['custom_id' =>'IPR001','price' => 430000],
        ['custom_id' =>'IPR002','price' => 380000], 
        ['custom_id' =>'IPR003','price' => 375000], 
        ['custom_id' =>'IPR004','price' => 350000],
        ['custom_id' =>'IPR005','price' => 340000], 
        ['custom_id' =>'IPR006','price' => 325000],
        ['custom_id' =>'IPR007','price' => 320000], 
        ['custom_id' =>'IPR008','price' => 310000], 
        ['custom_id' =>'IPR009','price' => 290000], 
        ['custom_id' =>'IPR010','price' => 285000], 
        ['custom_id' =>'IPR011','price' => 280000],
        ['custom_id' =>'IPR012','price' => 260000], 
        ['custom_id' =>'IPR013','price' => 255000], 
        ['custom_id' =>'IPR014','price' => 195000], 
    )
    ->create();

    \App\Models\Floor::factory()->count(5)
    ->sequence(
        ['custom_id' => 'IFL001', 'floor' => 0],
        ['custom_id' => 'IFL002', 'floor' => 1],
        ['custom_id' => 'IFL003', 'floor' => 2],
        ['custom_id' => 'IFL004', 'floor' => 3],
        ['custom_id' => 'IFL005', 'floor' => 4]
    )
    ->create();

       $this->call(InformationSeeder::class);

    \App\Models\DamageRoom::factory()->count(32)->sequence(
        [   'custom_id' => 'IDR001', 
        'properties_custom_id' => 'IPR001',
        'conditions_custom_id' => 'ICD001',
            'information_custom_id' => 'IIF001',
        ],
        [   'custom_id' => 'IDR002', 
        'properties_custom_id' => 'IPR001',
        'conditions_custom_id' => 'ICD002',
            'information_custom_id' => 'IIF002',
        ],
        [   'custom_id' => 'IDR003', 
        'properties_custom_id' => 'IPR001',
        'conditions_custom_id' => 'ICD003',
            'information_custom_id' => 'IIF003',
        ],
        [   'custom_id' => 'IDR004', 
        'properties_custom_id' => 'IPR001',
        'conditions_custom_id' => 'ICD004',
            'information_custom_id' => 'IIF004',
        ],
        [   'custom_id' => 'IDR005', 
        'properties_custom_id' => 'IPR002',
        'conditions_custom_id' => 'ICD001',
            'information_custom_id' => 'IIF005',
        ],
        [   'custom_id' => 'IDR006', 
        'properties_custom_id' => 'IPR002',
        'conditions_custom_id' => 'ICD002',
            'information_custom_id' => 'IIF006',
        ],
        [   'custom_id' => 'IDR007', 
            'conditions_custom_id' => 'ICD003',
            'properties_custom_id' => 'IPR002',
            'information_custom_id' => 'IIF007',
        ],
        [   'custom_id' => 'IDR008', 
            'conditions_custom_id' => 'ICD004',
            'properties_custom_id' => 'IPR002',
            'information_custom_id' => 'IIF008',
        ],
        [   'custom_id' => 'IDR009', 
        'properties_custom_id' => 'IPR003',
        'conditions_custom_id' => 'ICD001',
            'information_custom_id' => 'IIF009',
        ],
        [   'custom_id' => 'IDR010', 
        'properties_custom_id' => 'IPR003',
        'conditions_custom_id' => 'ICD002',
            'information_custom_id' => 'IIF010',
        ],
        [   'custom_id' => 'IDR011', 
        'properties_custom_id' => 'IPR003',
        'conditions_custom_id' => 'ICD003',
            'information_custom_id' => 'IIF011',
        ],
        [   'custom_id' => 'IDR012', 
        'properties_custom_id' => 'IPR003',
        'conditions_custom_id' => 'ICD004',
            'information_custom_id' => 'IIF012',
        ],
        [   'custom_id' => 'IDR013', 
        'properties_custom_id' => 'IPR004',
        'conditions_custom_id' => 'ICD001',
            'information_custom_id' => 'IIF013',
        ],
        [   'custom_id' => 'IDR014', 
        'properties_custom_id' => 'IPR004',
        'information_custom_id' => 'IIF014',
        'conditions_custom_id' => 'ICD002',
        ],
        [   'custom_id' => 'IDR015', 
        'properties_custom_id' => 'IPR004',
        'conditions_custom_id' => 'ICD003',
            'information_custom_id' => 'IIF015',
        ],
        [   'custom_id' => 'IDR016', 
        'properties_custom_id' => 'IPR004',
        'conditions_custom_id' => 'ICD004',
            'information_custom_id' => 'IIF016',
        ],
        [   'custom_id' => 'IDR017', 
        'properties_custom_id' => 'IPR005',
        'conditions_custom_id' => 'ICD001',
            'information_custom_id' => 'IIF017',
        ],
        [   'custom_id' => 'IDR018', 
        'properties_custom_id' => 'IPR005',
        'conditions_custom_id' => 'ICD002',
            'information_custom_id' => 'IIF018',
        ],
        [   'custom_id' => 'IDR019', 
        'properties_custom_id' => 'IPR005',
        'conditions_custom_id' => 'ICD003',
            'information_custom_id' => 'IIF019',
        ],
        [   'custom_id' => 'IDR020', 
        'properties_custom_id' => 'IPR005',
        'conditions_custom_id' => 'ICD004',
            'information_custom_id' => 'IIF020',
        ],
        [   'custom_id' => 'IDR021', 
        'properties_custom_id' => 'IPR006',
        'conditions_custom_id' => 'ICD001',
            'information_custom_id' => 'IIF021',
        ],
        [   'custom_id' => 'IDR022', 
        'properties_custom_id' => 'IPR006',
        'conditions_custom_id' => 'ICD002',
            'information_custom_id' => 'IIF022',
        ],
        [   'custom_id' => 'IDR023', 
        'properties_custom_id' => 'IPR006',
        'conditions_custom_id' => 'ICD003',
            'information_custom_id' => 'IIF023',
        ],
        [   'custom_id' => 'IDR024', 
        'properties_custom_id' => 'IPR006',
        'conditions_custom_id' => 'ICD004',
            'information_custom_id' => 'IIF024',
        ],
        [   'custom_id' => 'IDR025', 
        'properties_custom_id' => 'IPR007',
        'conditions_custom_id' => 'ICD001',
            'information_custom_id' => 'IIF025',
        ],
        [   'custom_id' => 'IDR026', 
        'properties_custom_id' => 'IPR007',
        'conditions_custom_id' => 'ICD002',
            'information_custom_id' => 'IIF026',
        ],
        [   'custom_id' => 'IDR027', 
        'properties_custom_id' => 'IPR007',
        'conditions_custom_id' => 'ICD003',
            'information_custom_id' => 'IIF027',
        ],
        [   'custom_id' => 'IDR028', 
        'properties_custom_id' => 'IPR007',
        'conditions_custom_id' => 'ICD004',
            'information_custom_id' => 'IIF028',
        ],
        [   'custom_id' => 'IDR029', 
        'properties_custom_id' => 'IPR008',
        'conditions_custom_id' => 'ICD001',
            'information_custom_id' => 'IIF029',
        ],
        [   'custom_id' => 'IDR030', 
        'properties_custom_id' => 'IPR008',
        'conditions_custom_id' => 'ICD002',
            'information_custom_id' => 'IIF030',
        ],
        [   'custom_id' => 'IDR031', 
        'properties_custom_id' => 'IPR008',
        'conditions_custom_id' => 'ICD003',
            'information_custom_id' => 'IIF031',
        ],
        [   'custom_id' => 'IDR032', 
        'properties_custom_id' => 'IPR008',
        'conditions_custom_id' => 'ICD004',
            'information_custom_id' => 'IIF032',
        ],
        )->create(); 

    \App\Models\UnitNumber::factory()->count(30)
    ->sequence(
        ['custom_id' => 'IUN001', 'no_unit' => 'No.01'],
        ['custom_id' => 'IUN002', 'no_unit' => 'No.02'],
        ['custom_id' => 'IUN003', 'no_unit' => 'No.03'],
        ['custom_id' => 'IUN004', 'no_unit' => 'No.04'],
        ['custom_id' => 'IUN005', 'no_unit' => 'No.05'],
        ['custom_id' => 'IUN006', 'no_unit' => 'No.06'],
        ['custom_id' => 'IUN007', 'no_unit' => 'No.07'],
        ['custom_id' => 'IUN008', 'no_unit' => 'No.08'],
        ['custom_id' => 'IUN009', 'no_unit' => 'No.09'],
        ['custom_id' => 'IUN010', 'no_unit' => 'No.10'],
        ['custom_id' => 'IUN011', 'no_unit' => 'No.11'],
        ['custom_id' => 'IUN012', 'no_unit' => 'No.12'],
        ['custom_id' => 'IUN013', 'no_unit' => 'No.13'],
        ['custom_id' => 'IUN014', 'no_unit' => 'No.14'],
        ['custom_id' => 'IUN015', 'no_unit' => 'No.15'],
        ['custom_id' => 'IUN016', 'no_unit' => 'No.16'],
        ['custom_id' => 'IUN017', 'no_unit' => 'No.17'],
        ['custom_id' => 'IUN018', 'no_unit' => 'No.18'],
        ['custom_id' => 'IUN019', 'no_unit' => 'No.19'],
        ['custom_id' => 'IUN020', 'no_unit' => 'No.20'],
        ['custom_id' => 'IUN021', 'no_unit' => 'No.21'],
        ['custom_id' => 'IUN022', 'no_unit' => 'No.22'],
        ['custom_id' => 'IUN023', 'no_unit' => 'No.23'],
        ['custom_id' => 'IUN024', 'no_unit' => 'No.24'],
        ['custom_id' => 'IUN025', 'no_unit' => 'No.25'],
        ['custom_id' => 'IUN026', 'no_unit' => 'No.26'],
        ['custom_id' => 'IUN027', 'no_unit' => 'No.27'],
        ['custom_id' => 'IUN028', 'no_unit' => 'No.28'],
        ['custom_id' => 'IUN029', 'no_unit' => 'No.29'],
        ['custom_id' => 'IUN030', 'no_unit' => 'No.30']
    )
    ->create();
    $this->call(RusunSeeder::class);
    $this->call(PriceTagSeeder::class);
    $this->call(KasnariansyahBlokASeeder::class);
    $this->call(KasnariansyahBlokBSeeder::class);
    $this->call(KasnariansyahBlokCSeeder::class);
    $this->call(KasnariansyahBlokDSeeder::class);
    $this->call(KertapatiBlokASeeder::class);
    $this->call(KertapatiBlokBSeeder::class);
    $this->call(KertapatiBlokCSeeder::class);
}


}
