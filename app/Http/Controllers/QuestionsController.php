<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
}
