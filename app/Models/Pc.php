<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pc extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'model', 'speed', 'ram', 'hd', 'cd', 'price'];

    public $timestamps = false;
}
