<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\auth\LoginRequest;
use App\Http\Requests\auth\PasswordChangeRequest;
use App\Http\Requests\auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return response([
            'message' => 'Registered successfully'
        ]);
    }

    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->validated())) {
            return response([
                'errors' => [
                    'password' => 'password or email is incorrect'
                ],
            ], 422);
        }

        $token = Auth::user()->createToken('token')->plainTextToken;

        return response([
            'message' => 'OK',
            'user' => Auth::user(),
            'token' => $token
        ]);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return response([
            'message' => 'Logged  out.'
        ]);
    }

    /**
     * Change authorized user's password
     *
     * @param PasswordChangeRequest $request
     * @return string[]
     */

    public function passwordChange(PasswordChangeRequest $request): array
    {
        Auth::user()->update([
            'password' => Hash::make($request->password),
        ]);

        return [
            'message' => 'OK',
        ];
    }
}
