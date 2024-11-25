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
        [   'custom_id' => 'IRO001', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR003'
        ],
        [   'custom_id' => 'IRO002', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR006'
        ],
        [   'custom_id' => 'IRO003', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR010'
        ],
        [   'custom_id' => 'IRO004', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR013'
        ],
        [   'custom_id' => 'IRO005', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR014'
        ],
        [   'custom_id' => 'IRO006', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR003'
        ],
        [   'custom_id' => 'IRO007', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR006'
        ],
        [   'custom_id' => 'IRO008', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR010'
        ],
        [   'custom_id' => 'IRO009', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR013'
        ],
        [   'custom_id' => 'IRO010', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR014'
        ],
        [   'custom_id' => 'IRO011', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR003'
        ],
        [   'custom_id' => 'IRO012', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR006'
        ],
        [   'custom_id' => 'IRO013', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR010'
        ],
        [   'custom_id' => 'IRO014', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR013'
        ],
        [   'custom_id' => 'IRO015', 
            'rusuns_custom_id' => 'IRN001', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR014'
        ],

        //rusun kasnariansyah
        [   'custom_id' => 'IRO016', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR004'
        ],
        [   'custom_id' => 'IRO017', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR007'
        ],
        [   'custom_id' => 'IRO018', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR009'
        ],
        [   'custom_id' => 'IRO019', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO001',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR012'
        ],
        [   'custom_id' => 'IRO020', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR001'
        ],
        [   'custom_id' => 'IRO021', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR004'
        ],
        [   'custom_id' => 'IRO022', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR007'
        ],
        [   'custom_id' => 'IRO023', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR009'
        ],
        [   'custom_id' => 'IRO024', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO002',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR012'
        ],
        [   'custom_id' => 'IRO025', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR001'
        ],
        [   'custom_id' => 'IRO026', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR002'
        ],
        [   'custom_id' => 'IRO027', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR005'
        ],
        [   'custom_id' => 'IRO028', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR008'
        ],
        [   'custom_id' => 'IRO029', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO003',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR011'
        ],
        [   'custom_id' => 'IRO030', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO004',
            'floors_custom_id' => 'IFL001',
            'prices_custom_id' => 'IPR001'
        ],
        [   'custom_id' => 'IRO031', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO004',
            'floors_custom_id' => 'IFL002',
            'prices_custom_id' => 'IPR002'
        ],
        [   'custom_id' => 'IRO032', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO004',
            'floors_custom_id' => 'IFL003',
            'prices_custom_id' => 'IPR005'
        ],
        [   'custom_id' => 'IRO033', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO004',
            'floors_custom_id' => 'IFL004',
            'prices_custom_id' => 'IPR008'
        ],
        [   'custom_id' => 'IRO034', 
            'rusuns_custom_id' => 'IRN002', 
            'bloks_custom_id' => 'IBO004',
            'floors_custom_id' => 'IFL005',
            'prices_custom_id' => 'IPR011'
        ],


        )->create();
    }
}
