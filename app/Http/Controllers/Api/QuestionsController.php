<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\questions\DeleteQuestionRequest;
use App\Http\Requests\questions\StoreQuestionRequest;
use App\Http\Requests\questions\UpdateQuestionRequest;
use App\Http\Resources\QuestionResource;
use App\Models\Question;
use App\Models\Solution;
use Illuminate\Support\Facades\Auth;

use function response;

class QuestionsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(['questions' => QuestionResource::collection(Question::all())]);
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

        $question->solutions()->create([
            'solution' => $request->input('solution'),
            'user_id' => Auth::id(),
        ]);

        return response(['message' => 'Question saved']);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        $solution = Solution::where('question_id', $question->id)->value('solution');

        $result = "App\\Models\\" . $solution;
        $data = eval("return $result");         // evaluates given string as PHP code(Eloquent), which returns data from database.

        return response(
            [
                'question' =>  new QuestionResource(Question::findOrFail($question->id)),
                'data' => $data,
            ]
        );
    }

    /**
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $question = Question::findOrFail($id);

        return response([
            'question' => ['title' => $question->title, 'solution' => Solution::where('question_id', $question->id)->value('solution')],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateQuestionRequest $request, Question $question)
    {
        $solution = $question->solutions()->where('user_id', Auth::id())->first();

        $question->update([
            'title' => $request->input('title'),
        ]);
        $solution->update([
            'solution' => $request->input('solution'),
        ]);

        return response(['message' => 'Updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeleteQuestionRequest $request, Question $question)
    {
        $question->delete();    //also deletes question's solutions
        return response(['message' => 'Question deleted']);
    }
}
