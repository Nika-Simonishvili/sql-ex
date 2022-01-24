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
        $code = 0;
        $maker = ['A', 'B', 'C', 'D', 'E'];
        $speed = [500, 750, 600, 900, 800, 450];
        $ram = [32, 64, 128];
        $hd = [5.0, 10.0, 20.0, 40.0, 14.0, 8.0];
        $cd = ['12x', '24x', '40x', '50x'];
        $price =[350.0, 400.0, 600.0, 850.0, 950.0, 970.0];



        for($i = 0; $i < 12; $i++){
            $keym = array_rand($maker);
            $keysp = array_rand($speed);
            $keyr = array_rand($ram);
            $keyh = array_rand($hd);
            $keysc = array_rand($cd);
            $keyp = array_rand($price);




            $maker_ = $maker[$keym];
            $product = Product::where('maker', $maker_)->first();

            Pc::create([
                'code' => $code,
                'model' => $product->model,
                'speed' => $speed[$keysp],
                'ram' => $ram[$keyr],
                'hd' => $hd[$keyh],
                'price' => $price[$keyp],
                'cd' => $cd[$keysc]
            ]);
            $code++;
        };

    }
}
