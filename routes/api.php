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

//penampilan nilai databases saja
Route::apiResource('/religions', App\Http\Controllers\Api\ReligionController::class);
Route::apiResource('/genders', App\Http\Controllers\Api\GenderController::class);
Route::apiResource('/educations', App\Http\Controllers\Api\EducationController::class);
Route::apiResource('/status_nikah', App\Http\Controllers\Api\StatusNikahController::class);
