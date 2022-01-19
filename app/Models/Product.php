<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Laptop;
use App\Models\Pc;
use App\Models\Printer;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['maker', 'model', 'type'];

    public function pcs()
    {
        return $this->hasMany(Pc::class, 'model', 'code');
    }

    public function laptops()
    {
        return $this->hasMany(Laptop::class, 'model', 'code');
    }

    public function printers()
    {
        return $this->hasMany(Printer::class, 'model', 'code');
    }
    
}
