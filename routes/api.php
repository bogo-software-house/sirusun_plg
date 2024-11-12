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
//resident
Route::apiResource('/residents', App\Http\Controllers\Api\ResidentController::class);
//resident/document
Route::apiResource('/residents/{id}/berkaskk', App\Http\Controllers\Api\BerkaskkController::class);
//update status transaction
Route::apiResource('/transactions', App\Http\Controllers\Api\TransactionStatusFormController::class);
