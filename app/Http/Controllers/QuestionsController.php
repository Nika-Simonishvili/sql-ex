<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuestionRequest;
use App\Http\Resources\QuestionResource;
use Illuminate\Http\Request;
use App\Models\Question;
use Illuminate\Support\Facades\Auth;
use Laravel\Ui\Presets\React;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questions = QuestionResource::collection(Question::all());  // get all questions

        return response(
            ['questions' => $questions],
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return string
     */
    public function store(StoreQuestionRequest $request)
    {
        $question = Question::create([
            'title' => $request->input('title'),
        ]);

        $solution = $request->input('solution');
        $question->solutions()->create([
            'solution' => $solution,
            'user_id' => Auth::id()
        ]);

        $result = "App\Models\\" . $solution;   // updates solution and based on that, gets $data
        $data = eval("return $result");

        return response(
            [
                'message' => 'Question saved',
                'data' => $data
            ],
            200
        );
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $question = new QuestionResource(Question::findOrFail($id));  // retrieve specific question with its id

        return response(
            ['question' => $question],
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $question = Question::findOrFail($id);

        // $solution = $request->input('solution');
        // $result = "App\Models\\" . $solution;   // updates solution and based on that, gets $data
        // $data = eval("return $result");

        // $question->update([
        //     'title' => $request->input('title'),
        //     'solution' => $solution,
        //     'data' => $data
        // ]);

        // return response(
        //     ['message' => 'Updated successfully'],
        //     200
        // );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $question =Question::findOrFail($id);
        $question->solutions()->delete();
        $question->delete();

        return response(
            ['message' => 'question deleted'],
            200
        );
    }
}
