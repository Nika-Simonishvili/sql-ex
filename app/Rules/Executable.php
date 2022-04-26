<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Executable implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */

    private $solutionError = 'Solution is not correct!';

    public function passes($attribute, $value)
    {
        try {
            $result = "App\\Models\\" . $value;
            eval("return $result");
            return true;
        } catch (\Throwable $error) {
            $this->solutionError = $error->getMessage();
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->solutionError;
    }
}
