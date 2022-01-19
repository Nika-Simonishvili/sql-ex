<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Printer;
use App\models\Product;


class PrinterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product = Product::where('maker', 'C')->first();

          // dump($product->model);

        Printer::create([
            'code' => 4,
            'model' => $product->model,
            'color' => 'n', 
            'type' => 'matrix',
            'price' => 150.0
        ]); 
    }
}
