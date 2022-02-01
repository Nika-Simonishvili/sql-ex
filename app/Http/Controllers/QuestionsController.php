<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Question;

class QuestionsController extends Controller
{
    public function index() {
        return Question::all();
    }

    public function show($id) {
        return Question::find($id);
    }

    public function store(Request $request) {
        return Question::create($request->all());
    }

    public function update(Request $request, $id) {
        $question = Question::findOrFail($id);
        $question->update($request->all());
        return $question;
    }

    public function destroy($id) {
        $question = Question::findOrFail($id);
        $question -> delete();
        return response(204);
    }

    public function solution($id){
        $data = Question::where('id', $id)->get('solution');

        $result1 = substr($data, 14);
        $result2 = substr($result1, 0, -3);

        $result = "App\Models\\" . $result2;

        return eval("return $result");
    }
}
