<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLaptopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('laptops', function (Blueprint $table) {
            $table->integer('code')->unique();
            $table->integer('model');
            $table->foreign('model')->references('model')->on('products');
            $table->tinyinteger('speed');
            $table->tinyinteger('ram');
            $table->decimal('hd');
            $table->decimal('price')->nullable();
            $table->tinyinteger('screen');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('laptops');
    }
}
