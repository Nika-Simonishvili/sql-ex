<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laptop extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'model', 'speed', 'ram', 'hd', 'price', 'speed'];

    public $timestamps = false;

    public function maker(){
        return $this->belongsTo(Product::class);
    }
}
