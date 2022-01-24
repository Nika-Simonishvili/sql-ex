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
        $code = 0;
        $maker = ['A', 'B', 'C', 'D', 'E'];
        $speed = [500, 350, 750, 600, 450];
        $ram = [32, 64, 128];
        $hd = [4.0, 8.0, 10.0, 12.0];
        $price =[700.0, 970.0, 1050.0, 1150.0, 1200.0];
        $screen = [11, 12, 14, 15];


        for($i = 0; $i < 6; $i++){
            $keym = array_rand($maker);
            $keysp = array_rand($speed);
            $keyr = array_rand($ram);
            $keyh = array_rand($hd);
            $keyp = array_rand($price);
            $keysc = array_rand($screen);



            $maker_ = $maker[$keym];
            $product = Product::where('maker', $maker_)->first();

            Laptop::create([
                'code' => $code,
                'model' => $product->model,
                'speed' => $speed[$keysp],
                'ram' => $ram[$keyr],
                'hd' => $hd[$keyh],
                'price' => $price[$keyp],
                'screen' => $screen[$keysc]
            ]);
            $code++;
        };



    }
}
