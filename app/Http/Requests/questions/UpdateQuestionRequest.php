<?php

namespace App\Http\Requests\questions;

use App\Models\Question;
use App\Rules\Executable;
use App\Rules\PreventDelete;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateQuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $question = Question::findOrFail($this->route('question')->id);
        $solution = $question->solutions()->where('user_id', Auth::id())->first();

        return (bool)$solution;
    }

    public function failedAuthorization()
    {
        throw new AuthorizationException('Solution is not yours!.');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required',
            'solution' => ['required', new PreventDelete, new Executable],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Please, Enter the question!',
            'solution.required' => 'Please, Enter the solution!',
        ];
    }
}
