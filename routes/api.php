<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Kernel;
use App\Http\Controllers\Api\UserController; 
use App\Http\Controllers\Api\RoomsController; 
use App\Http\Controllers\Api\ReportRoomController; 

//posts
Route::apiResource('/pricetag', App\Http\Controllers\Api\PriceTagController::class);
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
Route::apiResource('/berkasktp', App\Http\Controllers\Api\BerkasktpController::class);


//penampilan nilai databases saja
Route::apiResource('/religions', App\Http\Controllers\Api\ReligionController::class);
Route::apiResource('/genders', App\Http\Controllers\Api\GenderController::class);
Route::apiResource('/educations', App\Http\Controllers\Api\EducationController::class);
Route::apiResource('/status_nikah', App\Http\Controllers\Api\StatusNikahController::class);
Route::apiResource('/status-form', App\Http\Controllers\Api\StatusFormController::class);

Route::apiResource('/salaries', App\Http\Controllers\Api\SalaryController::class);




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
                    //users

                    Route::apiResource('/users-data', UserController::class);   
                    //users
                    Route::put('/admin-update-password', [UserController::class,'updatepassword']);

                    //Route::middleware(App\Http\Middleware\CheckRusun::class.':kasnariansya')->group(function () {
                    Route::get('/admin-kasnariansya/dashboard', function () {
                        return response()->json(['message' => 'Selamat datang di dashboard admin kasnariansya']);
                    });

                    //  });   


                    //  Route::middleware(App\Http\Middleware\CheckRusun::class.':kertapati')->group(function () {
                    Route::get('/admin-kertapati/dashboard', function () {
                        return response()->json(['message' => 'Selamat datang di dashboard admin kertapati']);
                    
                    });
              //  });
            });

            // Route khusus user
            Route::middleware(App\Http\Middleware\CheckRole::class.':user')->group(function () {
             Route::get('/user/dashboard', function () {
                    return response()->json(['message' => 'Selamat datang di dashboard user']);
                });
             //users
             Route::put('/users-update-password', [UserController::class,'updatepassword']);  
            });
        });
        
    });
    //update status transaction

        Route::apiResource('/transactions', App\Http\Controllers\Api\TransactionStatusFormController::class);
        //transaksi rooms
        Route::apiResource('/transactions-rooms', App\Http\Controllers\Api\TransactionRoomController::class);

        //pemanggilan kamar untuk pemilihan di admin
        Route::get('/pengambilan-data-kamar/{id}', [RoomsController::class,'showAllRoomFromRusun']);  
        
        //report kondisi kamar di admin
        Route::get('/report-kamar', [ReportRoomController::class,'indextahun']);  