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
        $makers = ['A', 'B', 'C', 'D', 'E'];
        $models = [1232, 1233, 1276, 1298, 1401, 1408, 1752, 1121, 1750, 1321, 1288, 1433, 1260, 1434, 2112, 2113];
        $types = ['PC', 'Laptop', 'Printer'];

        for ($i = 0; $i < count($models); $i++) {
            $keymaker = array_rand($makers);
            $keytypes = array_rand($types);


            Product::create([
                'maker' => $makers[$keymaker],
                'model' => $models[$i],
                'type' => $types[$keytypes]
            ]);

        }
    }
}
