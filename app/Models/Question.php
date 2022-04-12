<?php

namespace App\Models;

use App\Models\Solution;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Question extends Model
{
    use HasFactory;

    protected $hidden = ['timestamps'];

    protected $guarded = [];

    public function solutions()
    {
        return $this->hasMany(Solution::class);
    }
}
