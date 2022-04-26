<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuestionRequest;
use App\Http\Resources\QuestionResource;
use App\Models\Question;
use App\Models\Solution;
use Illuminate\Support\Facades\Auth;

use function response;

class QuestionsController extends Controller
{
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
    public function store(QuestionRequest $request)
    {
        try {
            $result = "App\\Models\\" . $request->input('solution');
            eval("return $result");
        } catch (\Throwable $error) {
            return response([
                'errors' => [
                    'solution' => $error->getMessage(),
                ],
            ], 422);
        }

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
    public function show($id)
    {
        $question = new QuestionResource(Question::findOrFail($id));
        $solution = Solution::where('question_id', $question->id)->value('solution');

        $result = "App\\Models\\" . $solution;   // updates solution and based on that, gets $data
        $data = eval("return $result");

        return response(
            [
                'question' => $question,
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
    public function update(QuestionRequest $request, $id)
    {
        try {
            $result = "App\\Models\\" . $request->input('solution');;
            eval("return $result");
        } catch (\Throwable $error) {
            return response([
                'errors' => [
                    'solution' => $error->getMessage(),
                ],
            ], 422);
        }
        $question = Question::findOrFail($id);
        $solution = Solution::where('question_id', $question->id)->first();

        if ($solution->user_id == Auth::id()) {
            $question->update([
                'title' => $request->input('title'),
            ]);
            $solution->update([
                'solution' => $request->input('solution'),
            ]);

            return response(['message' => 'Updated successfully']);
        }

        return response(['server_error' => 'Solution is not yours!'], 403);
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
        $solution = Solution::where('question_id', $question->id)->first();

        if ($solution->user_id == Auth::id()) {
            $question->delete();
            return response(['message' => 'Question deleted']);
        }

        return response(['message' => 'Solution is not yours!'], 403);
    }
}
