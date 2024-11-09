<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
//users
Route::apiResource('/users', App\Http\Controllers\Api\UserController::class);
//posts
Route::apiResource('/posts', App\Http\Controllers\Api\PostController::class);
//rusun
Route::apiResource('/rusuns', App\Http\Controllers\Api\RusunController::class);