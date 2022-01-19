<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Laptop;

class LaptopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product = Product::where('maker', 'C')->first();

        Laptop::create([
            'code' => 5,
            'model' => $product->model,
            'speed' => 75,
            'ram' => 100,
            'hd' => 10.0,
            'price' => 1150.0,
            'screen' => 14
        ]); 
    }
}
