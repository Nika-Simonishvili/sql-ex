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
        $array = array
        (
                 array(1,	1276,	'n',	'Laser',	400.0000),
                 array(2,	1433,	'y',	'Jet',	    270.0000),
                 array(3,	1434,	'y',	'Jet',	    290.0000),
                 array(4,	1401,	'n',	'Matrix',	150.0000),
                 array(5,	1408,	'n',	'Matrix',	270.0000),
                 array(6,	1288,	'n',	'Laser',	400.0000)
        );

        foreach ($array as $key) {
            DB::table('printers')->insert([
                'code' =>$key[0],
                'model' => $key[1],
                'color' => $key[2],
                'type' => $key[3],
                'price' => $key[4]
            ]);
        }
    }
}
