<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
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
            'token' => $token
        ]);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return response([
            'message' => 'looged out.'
        ]);
    }
}
