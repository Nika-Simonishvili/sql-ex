<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
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
            'solution' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Please, Enter the question!',
            'solution.required' => 'Please, Enter the solution!'
        ];
    }
}
