<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $array = array
        (
                 array('A',	1232, 'PC'),
                 array('A', 1233, 'PC'),
                 array('A',	1276, 'Printer'),
                 array('A',	1298, 'Laptop'),
                 array('A',	1401, 'Printer'),
                 array('A',	1408, 'Printer'),
                 array('A',	1752, 'Laptop'),
                 array('B',	1121, 'PC'),
                 array('B',	1750, 'Laptop'),
                 array('C',	1321, 'Laptop'),
                 array('D',	1288, 'Printer'),
                 array('D',	1433, 'Printer'),
                 array('E',	1260, 'PC'),
                 array('E',	1434, 'Printer'),
                 array('E',	2112, 'PC'),
                 array('E',	2113, 'PC')
        );

        foreach ($array as $key) {
            DB::table('products')->insert([
                'maker' => $key[0],
                'model' => $key[1],
                'type' => $key[2]
            ]);
        }
    }
}
