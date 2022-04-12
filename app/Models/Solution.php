<?php

namespace App\Models;

use App\Models\Question;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Solution extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $hidden = ['id', 'question_id', 'user_id', 'created_at', 'updated_at'];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
