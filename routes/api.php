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
//complaint
Route::apiResource('/complaints', App\Http\Controllers\Api\ComplaintController::class);
//floor
Route::apiResource('/floors', App\Http\Controllers\Api\FloorController::class);
//status
Route::apiResource('/statuses', App\Http\Controllers\Api\StatusesController::class);
//property
Route::apiResource('/properties', App\Http\Controllers\Api\PropertiesController::class);
//condition
Route::apiResource('/conditions', App\Http\Controllers\Api\ConditionController::class);
//damage_room
Route::apiResource('/damagerooms', App\Http\Controllers\Api\DamageroomsController::class);
//information
Route::apiResource('/informations', App\Http\Controllers\Api\InformationController::class);
//unit_numbers
Route::apiResource('/unit_numbers', App\Http\Controllers\Api\UnitnumberController::class);
//rooms
Route::apiResource('/rooms', App\Http\Controllers\Api\RoomsController::class);
//jenis_kelamin
Route::apiResource('/genders', App\Http\Controllers\Api\GendersController::class);
//married_statuses
Route::apiResource('/married_statuses', App\Http\Controllers\Api\MarriedstatusesController::class);
//religion
Route::apiResource('/religions', App\Http\Controllers\Api\ReligionController::class);
//education
Route::apiResource('/educations', App\Http\Controllers\Api\EducationController::class);
//form
// Route::apiResource('/forms', App\Http\Controllers\Api\FormController::class);
//berkas_scan_kk
// Route::apiResource('/berkas_scan_kks', App\Http\Controllers\Api\Berkas_scan_kkController::class);
//berkas_scan_ktp
// Route::apiResource('/berkas_scan_ktps', App\Http\Controllers\Api\Berkas_scan_ktpController::class);
//resident/penghuni
// Route::apiResource('/residents', App\Http\Controllers\Api\ResidentController::class);