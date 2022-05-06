<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Printer extends Model
{
    use HasFactory;

    protected $primaryKey = ['code'];
    public $incrementing = false;

    protected $filalble = ['code', 'model', 'color', 'type', 'price'];

    public $timestamps = false;

    public function maker(){
        return $this->belongsTo(Product::class);
    }
}
