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
        $code = 0;
        $maker = ['A', 'B', 'C', 'D', 'E'];
        $color = ['n', 'y'];
        $type = ['Laser', 'Matrix', 'Jet'];
        $price =[150.0, 270.0, 290.0, 400.0];



        for($i = 0; $i < 6; $i++){
            $keym = array_rand($maker);
            $keycolor = array_rand($color);
            $keytype = array_rand($type);
            $keyprice = array_rand($price);




            $maker_ = $maker[$keym];
            $product = Product::where('maker', $maker_)->first();

            Printer::create([
                'code' => $code,
                'model' => $product->model,
                'color' => $color[$keycolor],
                'type' => $type[$keytype],
                'price' => $price[$keyprice]
            ]);
            $code++;
        };
    }
}
