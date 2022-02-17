<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Printer;

class PrinterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $array = [
            [1, 1276, 'n', 'Laser', 400.0000],
            [2, 1433, 'y', 'Jet', 270.0000],
            [3, 1434, 'y', 'Jet', 290.0000],
            [4, 1401, 'n', 'Matrix', 150.0000],
            [5, 1408, 'n', 'Matrix', 270.0000],
            [6, 1288, 'n', 'Laser', 400.0000],
        ];

        foreach ($array as $value) {
            Printer::updateOrCreate([
                'code' => $value[0],
                'model' => $value[1],
                'color' => $value[2],
                'type' => $value[3],
                'price' => $value[4]
            ]);
        }
    }
}
