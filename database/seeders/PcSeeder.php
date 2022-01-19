<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pc;
use App\Models\Product;

class PcSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product = Product::where('maker', 'C')->first();

        Pc::create([
            'code' => 9,
            'model' => $product->model,
            'speed' => 45,
            'ram' => 32,
            'hd' => 10.0,
            'cd' => '24x',
            'price' => 450.0
        ]); 
    }
}
