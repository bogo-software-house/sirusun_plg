<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            \App\Models\User::factory()->count(7)->sequence(
                [
                    'custom_id' => 'IUS001',
                    'nik' => '1271189098765431',  // NIK yang sudah ada di database
                    'username' => 'admin', 
                    'password' => bcrypt('admin123'), 
                    'roles_custom_id' => 'IRO001'  // Menggunakan role admin yang sudah ada
                ],
                [
                    'custom_id' => 'IUS002',
                    'nik' => '1271189098765432',  // NIK yang sudah ada di database
                    'username' => 'staf', 
                    'password' => bcrypt('admin123'), 
                    'roles_custom_id' => 'IRO001'  // Menggunakan role admin yang sudah ada
                ],
                [   'custom_id' => 'IUS003',
                    'nik' => '1271189098765433',
                    'username' => 'dedi_23',
                    'password' => bcrypt ('user123'),
                    'roles_custom_id' => 'IRO002',
                ],
                [   'custom_id' => 'IUS004',
                    'nik' => '1271189098765438',
                    'username' => 'jointa_ginting',
                    'password' => bcrypt ('user123'),
                    'roles_custom_id' => 'IRO002',
                ],
                [   'custom_id' => 'IUS005',
                    'nik' => '1271189098765439',
                    'username' => 'ahmad_03',
                    'password' => bcrypt ('user123'),
                    'roles_custom_id' => 'IRO002',
                ],
                [   'custom_id' => 'IUS006',
                    'nik' => '1271189098765435',
                    'username' => 'pt_pkp',
                    'password' => bcrypt ('user123'),
                    'roles_custom_id' => 'IRO002',
                ],
                [   'custom_id' => 'IUS007',
                    'nik' => '1271189076578965',
                    'username' => 'pt_pk3',
                    'password' => bcrypt ('user123'),
                    'roles_custom_id' => 'IRO002',
                ],
                )->create();
    }
}
