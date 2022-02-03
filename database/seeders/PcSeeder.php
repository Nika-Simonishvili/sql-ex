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
            $array = [1,	1232,	500,	64,	5.0,	'12x',	600.0000,
                        10,	1260,	500,	32,	10.0,	'12x',	350.0000,
                    11,	1233,	900,	128,	40.0,	'40x',	980.0000,
                    12,	1233,	800,	128,	20.0,	'50x',	970.0000,
                    2,	1121,	750,	128,	14.0,	'40x',	850.0000,
                    3,	1233,	500,	64,	    5.0,	'12x',	600.0000,
                    4,	1121,	600,	128,	14.0,	'40x',	850.0000,
                    5,	1121,	600,	128,	8.0,	'40x',	850.0000,
                    6,	1233,	750,	128,	20.0,	'50x',	950.0000,
                    7,	1232,	500,	32,	    10.0,	'12x',	400.0000,
                    8,	1232,	450,	64,	    8.0,	'24x',	350.0000,
                    9,	1232,	450,	32,	    10.0,	'24x',	350.0000];


        for($i=0; $i<count($array); $i++){
            if(($i % 7)==0){
                DB::table('pcs')->insert([
                    'code' =>$array[$i],
                    'model' => $array[$i+1],
                    'speed' => $array[$i+2],
                    'ram' => $array[$i+3],
                    'hd' => $array[$i+4],
                    'cd' => $array[$i+5],
                    'price' => $array[$i+6]
                ]);
            }
        }
    }
}
