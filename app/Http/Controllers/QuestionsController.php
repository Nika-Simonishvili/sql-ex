<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Question;

class QuestionsController extends Controller
{
    public function index()
    {
        return Question::all();
    }

    public function show($id)
    {
        return Question::find($id);
    }

    public function store(Request $request)
    {

        $solution = $request->input('solution');
        $result = "App\Models\\" . $solution;

        $data = eval("return $result");

        return Question::create([
            'title' => $request->input('title'),
            'solution' => $request->input('solution'),
            'data' => $data
        ]);
    }

    public function update(Request $request, $id)
    {
        $question = Question::findOrFail($id);

        $solution = $request->input('solution');
        $result = "App\Models\\" . $solution;

        $data = eval("return $result");

        $question->update([
            'title' => $request->input('title'),
            'solution' => $request->input('solution'),
            'data' => $data
        ]);
        return $question;
    }

    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question -> delete();
        return response(204);
    }

}
