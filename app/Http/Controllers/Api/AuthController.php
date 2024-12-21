<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
      // Login User
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required|string',
        ]);

        // Cari user berdasarkan username
        $user = User::with([
        'role',
        'transactionRoom.room.unitNumber',
        'transactionRoom.room.priceTag.rusuns',
        'transactionRoom.room.priceTag.bloks',
        'transactionRoom.room.priceTag.floors',
        ])->where('username', $request->username)->orWhere('nik', $request->username)->first();

        // Periksa kredensial
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'password tidak valid'
            ], 401);
        }

        // Hapus token lama
        $user->tokens()->delete();
        // Buat token baru
        $token = $user->createToken('auth_token')->plainTextToken;
         // Cek peran pengguna

            if ($user->role->leveluser === 'admin') {

                    return response()->json([
                        'message' => 'Login admin kertapati berhasil',
                        'token' => $token,
                        'role' => $user->role->leveluser,
                        'username' => $user->username, // Tambahkan username di respons

                        'redirect' => '/api/auth/admin-kertapati/dashboard' // URL untuk admin
                    ]);


            } elseif ($user->role->leveluser === 'user') {
                return response()->json([
                    'message' => 'Login berhasil',
                    'token' => $token,
                    'role' => $user->role->leveluser,
                    'username' => $user->username, // Tambahkan username di respons

                    'redirect' => '/api/auth/user/dashboard' // URL untuk user
                ]);
            } elseif ($user->role->leveluser === 'staff') {
                return response()->json([
                    'message' => 'Login berhasil',
                    'token' => $token,
                    'role' => $user->role->leveluser,
                    'username' => $user->username, // Tambahkan username di respons

                    'redirect' => '/api/auth/staff/dashboard' // URL untuk user
                ]);
            }

             return response()->json(['message' => 'Login gagal'], 401);

       
    }

    // Logout User
    public function logout(Request $request)
    {
        // Hapus semua token
        auth()->user()->tokens()->delete();

        // Hapus session
        // $request->session()->invalidate();
        // $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Berhasil logout'
        ]);
    }

    // Cek Status Autentikasi
    public function me(Request $request)
    {
       $user = $request->user()->load([
        'role',
        'transactionRoom.room.unitNumber',
        'transactionRoom.room.priceTag.rusuns',
        'transactionRoom.room.priceTag.bloks',
        'transactionRoom.room.priceTag.floors',
    ]);

    return response()->json([
        'user' => [
            'name' => $user->username,
            'nik' => $user->nik,
            'rusun' => $user->transactionRoom->room->priceTag->rusuns->nama_rusun ?? null,
            'blok' => $user->transactionRoom->room->priceTag->bloks->blok ?? null,
            'lantai' => $user->transactionRoom->room->priceTag->floors->floor ?? null,
            'no_unit' => $user->transactionRoom->room->UnitNumber->no_unit ?? null, // Ganti dengan kolom yang sesuai
        ],
        'role' => $user->role->leveluser,
    ]);
    }
}