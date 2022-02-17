<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
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
        $array = [
            ['A', 1232, 'PC'],
            ['A', 1233, 'PC'],
            ['A', 1276, 'Printer'],
            ['A', 1298, 'Laptop'],
            ['A', 1401, 'Printer'],
            ['A', 1408, 'Printer'],
            ['A', 1752, 'Laptop'],
            ['B', 1121, 'PC'],
            ['B', 1750, 'Laptop'],
            ['C', 1321, 'Laptop'],
            ['D', 1288, 'Printer'],
            ['D', 1433, 'Printer'],
            ['E', 1260, 'PC'],
            ['E', 1434, 'Printer'],
            ['E', 2112, 'PC'],
            ['E', 2113, 'PC'],
        ];

        foreach ($array as $value) {
            Product::updateOrCreate([
                'maker' => $value[0],
                'model' => $value[1],
                'type' => $value[2]
            ]);
        }
    }
}
