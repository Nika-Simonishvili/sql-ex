<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Pc;

class PcSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            $array = array
            (
                     array(1,  1232,	500,   64,	5.0,   '12x',	600.0000),
                     array(10, 1260,	500,   32,	10.0,  '12x',	350.0000),
                     array(11, 1233,	900,   128, 40.0,  '40x',	980.0000),
                     array(12, 1233,	800,   128, 20.0,  '50x',	970.0000),
                     array(2,  1121,	750,   128, 14.0,  '40x',	850.0000),
                     array(3,  1233,	500,   64,	 5.0,  '12x',	600.0000),
                     array(4,  1121,	600,   128, 14.0,  '40x',	850.0000),
                     array(5,  1121,	600,   128, 8.0,   '40x',	850.0000),
                     array(6,  1233,	750,   128, 20.0,  '50x',	950.0000),
                     array(7,  1232,	500,   32,	10.0,  '12x',	400.0000),
                     array(8,  1232,	450,   64,	8.0,   '24x',	350.0000),
                     array(9,  1232,	450,   32,	10.0,  '24x',	350.0000)
            );

            foreach ($array as $key) {
                DB::table('pcs')->insert([
                    'code' =>$key[0],
                    'model' => $key[1],
                    'speed' => $key[2],
                    'ram' => $key[3],
                    'hd' => $key[4],
                    'cd' => $key[5],
                    'price' => $key[6]
                ]);
            }
    }
}
