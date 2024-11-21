<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Kernel;


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
//resident
Route::apiResource('/residents', App\Http\Controllers\Api\ResidentController::class);
//resident/document
Route::apiResource('/berkaskk', App\Http\Controllers\Api\BerkaskkController::class);


//penampilan nilai databases saja
Route::apiResource('/religions', App\Http\Controllers\Api\ReligionController::class);
Route::apiResource('/genders', App\Http\Controllers\Api\GenderController::class);
Route::apiResource('/educations', App\Http\Controllers\Api\EducationController::class);
Route::apiResource('/status_nikah', App\Http\Controllers\Api\StatusNikahController::class);



    //minddleware login
    Route::prefix('auth')->group(function () {
        // Login
        Route::post('/login', [AuthController::class, 'login']);
        
        // Route yang membutuhkan autentikasi
        Route::middleware('auth:sanctum')->group(function () {
            // Logout
            Route::post('/logout', [AuthController::class, 'logout']);
            
            // Cek user
            Route::get('/me', [AuthController::class, 'me']);

            // Route khusus admin
            Route::middleware(App\Http\Middleware\CheckRole::class.':admin')->group(function () {
                Route::get('/admin/dashboard', function () {
                    return response()->json(['message' => 'Selamat datang di dashboard admin']);
                });
            });

            // Route khusus user
            //Route::middleware("role.check:user")->group(function () {
             Route::get('/user/dashboard', function () {
                    return response()->json(['message' => 'Selamat datang di dashboard user']);
                })->middleware(App\Http\Middleware\CheckRole::class.':USER');
            //});
        });
        
    });
    //update status transaction
        Route::apiResource('/transactions', App\Http\Controllers\Api\TransactionStatusFormController::class);
