<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\QuestionsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//auth routes
Route::controller(AuthController::class)->group( function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('password-change', 'passwordChange')->middleware('auth:sanctum');
    Route::post('logout', 'logout')->middleware('auth:sanctum');
});

//question's protected routes
Route::middleware('auth:sanctum')->controller(QuestionsController::class)->group( function() {
    Route::post('questions', 'store');
    Route::put('questions/{id}', 'update');
    Route::delete('questions/{id}',  'destroy');
});

Route::get('questions', [QuestionsController::class, 'index']);
Route::get('questions/{id}', [QuestionsController::class, 'show']);
