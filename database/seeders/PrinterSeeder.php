<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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
            1,	1276,	'n',	'Laser',	400.0000,
            2,	1433,	'y',	'Jet',	    270.0000,
            3,	1434,	'y',	'Jet',	    290.0000,
            4,	1401,	'n',	'Matrix',	150.0000,
            5,	1408,	'n',	'Matrix',	270.0000,
            6,	1288,	'n',	'Laser',	400.0000
        ];

        for($i=0; $i<count($array); $i++){
            if(($i % 5)==0){
                DB::table('printers')->insert([
                    'code' =>$array[$i],
                    'model' => $array[$i+1],
                    'color' => $array[$i+2],
                    'type' => $array[$i+3],
                    'price' => $array[$i+4]
                ]);
            }
        }
    }
}
