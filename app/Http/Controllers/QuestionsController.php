<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuestionRequest;
use App\Http\Resources\QuestionResource;
use App\Models\Question;
use App\Models\Solution;
use Illuminate\Support\Facades\Auth;

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

        return response( ['questions' => $questions] );
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

        $question->solution()->create([
            'solution' => $request->input('solution'),
            'user_id' => Auth::id(),
        ]);

        return response( ['message' => 'Question saved'] );
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $question = Question::findOrFail($id);
        $solution = Solution::where('question_id', $question->id)->value('solution');

        $result = "App\\Models\\" . $solution;   // updates solution and based on that, gets $data
        $data = eval("return $result");

        return response(
            [
                'question' => $question,
                'solution' => $solution,
                'data' => $data
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreQuestionRequest $request, $id)
    {
        $question = Question::findOrFail($id);
        $question->update([
            'title' =>  $request->input('title'),
        ]);

        $question->solution()->update([
            'solution' => $request->input('solution'),
        ]);

        return response( ['message' => 'Updated successfully'] );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->solution()->delete();
        $question->delete();

        return response( ['message' => 'question deleted'] );
    }
}
