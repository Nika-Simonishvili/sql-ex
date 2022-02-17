<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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
        $array = [
            [1, 1298, 350, 32, 4.0, 700.0000, 11],
            [2, 1321, 500, 64, 8.0, 970.0000, 12],
            [3, 1750, 750, 128, 12.0, 1200.0000, 14],
            [4, 1298, 600, 64, 10.0, 1050.0000, 15],
            [5, 1752, 750, 128, 10.0, 1150.0000, 14],
            [6, 1298, 450, 64, 10.0, 950.0000, 12],
        ];

        foreach ($array as $value) {
            Laptop::updateOrCreate([
                'code' => $value[0],
                'model' => $value[1],
                'speed' => $value[2],
                'ram' => $value[3],
                'hd' => $value[4],
                'price' => $value[5],
                'screen' => $value[6]
            ]);
        }
    }
}
