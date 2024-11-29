<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PriceTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    \App\Models\PriceTag::factory()->count(34)->sequence(
        [   'custom_id' => 'IPT001', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR003'
        ],
        [   'custom_id' => 'IPT002', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR006'
        ],
        [   'custom_id' => 'IPT003', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR010'
        ],
        [   'custom_id' => 'IPT004', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR013'
        ],
        [   'custom_id' => 'IPT005', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR014'
        ],
        [   'custom_id' => 'IPT006', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR003'
        ],
        [   'custom_id' => 'IPT007', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR006'
        ],
        [   'custom_id' => 'IPT008', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR010'
        ],
        [   'custom_id' => 'IPT009', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR013'
        ],
        [   'custom_id' => 'IPT010', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR014'
        ],
        [   'custom_id' => 'IPT011', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR003'
        ],
        [   'custom_id' => 'IPT012', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR006'
        ],
        [   'custom_id' => 'IPT013', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR010'
        ],
        [   'custom_id' => 'IPT014', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR013'
        ],
        [   'custom_id' => 'IPT015', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR014'
        ],

        //rusun kasnariansyah
        [   'custom_id' => 'IPT016', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR004'
        ],
        [   'custom_id' => 'IPT017', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR007'
        ],
        [   'custom_id' => 'IPT018', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR009'
        ],
        [   'custom_id' => 'IPT019', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR012'
        ],
        [   'custom_id' => 'IPT020', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR001'
        ],
        [   'custom_id' => 'IPT021', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR004'
        ],
        [   'custom_id' => 'IPT022', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR007'
        ],
        [   'custom_id' => 'IPT023', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR009'
        ],
        [   'custom_id' => 'IPT024', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR012'
        ],
        [   'custom_id' => 'IPT025', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR001'
        ],
        [   'custom_id' => 'IPT026', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR002'
        ],
        [   'custom_id' => 'IPT027', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR005'
        ],
        [   'custom_id' => 'IPT028', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR008'
        ],
        [   'custom_id' => 'IPT029', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR011'
        ],
        [   'custom_id' => 'IPT030', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO004',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR001'
        ],
        [   'custom_id' => 'IPT031', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO004',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR002'
        ],
        [   'custom_id' => 'IPT032', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO004',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR005'
        ],
        [   'custom_id' => 'IPT033', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO004',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR008'
        ],
        [   'custom_id' => 'IPT034', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO004',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR011'
        ],


        )->create();
    }
}
