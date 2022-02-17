<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Question::all();  // get all questions
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $solution = $request->input('solution');
        $result = "App\Models\\" . $solution;

        $data = eval("return $result");   // evaluate solution as query and save given data

        return Question::create([
            'title' => $request->input('title'),
            'solution' => $solution,
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Question::find($id);  // retrieve specific question with its id
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $question = Question::findOrFail($id);

        $solution = $request->input('solution');
        $result = "App\Models\\" . $solution;   // updates solution and based on that, gets $data

        $data = eval("return $result");

        $question->update([
            'title' => $request->input('title'),
            'solution' => $solution,
            'data' => $data
        ]);
        return $question;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question -> delete();
        return response(204);
    }
}

