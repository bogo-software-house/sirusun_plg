<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResidentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Resident::factory()->count(5)->sequence(
        [   'nik' => '1271189098765432', 
            'username' => 'dedi_23', 
            'tempat_lahir' => 'Medan',
            'tanggal_lahir' => '1999-11-24',
            'genders_custom_id' => 'IGD001',
            'status_nikah_custom_id' =>'ISN001',
            'religions_custom_id' =>'IRL001',
            'education_custom_id' =>'IED003',
            'alamat_rumah' =>'simpang tinju',
            'no_telp' =>'0909090909',
            'salaries_custom_id' =>'ISY001',
            'warga_negara' =>'Indonesia',
            'pekerjaan' =>'Wiraswata',
            'alamat_tempat_kerja' =>'jln gajah mada',
            'email' =>'dedi@gmail.com'
        ],
        [   'nik' => '1271189098765438', 
            'username' => 'jointa_ginting', 
            'tempat_lahir' => 'Jakarta',
            'tanggal_lahir' => '1999-11-24',
            'genders_custom_id' => 'IGD001',
            'status_nikah_custom_id' =>'ISN001',
            'religions_custom_id' =>'IRL001',
            'education_custom_id' =>'IED003',
            'alamat_rumah' =>'simpang tinju',
            'no_telp' =>'0909090909',
            'salaries_custom_id' =>'ISY001',
            'warga_negara' =>'Indonesia',
            'pekerjaan' =>'Wiraswata',
            'alamat_tempat_kerja' =>'jln gajah mada',
            'email' =>'jointa_ginting@gmail.com'
        ],
        [   'nik' => '1271189098765439', 
            'username' => 'ahmad_03', 
            'tempat_lahir' => 'Bandung',
            'tanggal_lahir' => '1999-11-24',
            'genders_custom_id' => 'IGD001',
            'status_nikah_custom_id' =>'ISN001',
            'religions_custom_id' =>'IRL001',
            'education_custom_id' =>'IED003',
            'alamat_rumah' =>'simpang tinju',
            'no_telp' =>'0909090909',
            'salaries_custom_id' =>'ISY001',
            'warga_negara' =>'Indonesia',
            'pekerjaan' =>'Wiraswata',
            'alamat_tempat_kerja' =>'jln gajah mada',
            'email' =>'ahmad@gmail.com'
        ],
        [   'nik' => '1271189098765435', 
            'username' => 'pt_pkp', 
            'tempat_lahir' => 'Riau',
            'tanggal_lahir' => '1999-11-24',
            'genders_custom_id' => 'IGD001',
            'status_nikah_custom_id' =>'ISN001',
            'religions_custom_id' =>'IRL001',
            'education_custom_id' =>'IED003',
            'alamat_rumah' =>'simpang tinju',
            'no_telp' =>'0909090909',
            'salaries_custom_id' =>'ISY001',
            'warga_negara' =>'Indonesia',
            'pekerjaan' =>'Wiraswata',
            'alamat_tempat_kerja' =>'jln gajah mada',
            'email' =>'pt_pkp@gmail.com'
        ],
        [   'nik' => '1271189076578965', 
            'username' => 'pt_pk3', 
            'tempat_lahir' => 'Padang',
            'tanggal_lahir' => '1999-11-24',
            'genders_custom_id' => 'IGD001',
            'status_nikah_custom_id' =>'ISN001',
            'religions_custom_id' =>'IRL001',
            'education_custom_id' =>'IED003',
            'alamat_rumah' =>'simpang tinju',
            'no_telp' =>'0909090909',
            'salaries_custom_id' =>'ISY001',
            'warga_negara' =>'Indonesia',
            'pekerjaan' =>'Wiraswata',
            'alamat_tempat_kerja' =>'jln gajah mada',
            'email' =>'pt_pk3@gmail.com'
        ],
        )->create();
    }
}
