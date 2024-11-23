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
        $user = User::with('role')->where('username', $request->username)->orWhere('nik', $request->username)->first();

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

                // if($request->input('username') === 'admin-kertapati'){

                    return response()->json([
                        'message' => 'Login admin kertapati berhasil',
                        'token' => $token,
                        'role' => $user->role->leveluser,
                        'redirect' => '/api/auth/admin-kertapati/dashboard' // URL untuk admin
                    ]);
                // }else{
                //       return response()->json([
                //         'message' => 'Login admin kertapati berhasil',
                //         'token' => $token,
                //         'redirect' => '/api/auth/admin/dashboard' // URL untuk admin
                //     ]);
                // }

            } elseif ($user->role->leveluser === 'user') {
                return response()->json([
                    'message' => 'Login berhasil',
                    'token' => $token,
                    'role' => $user->role->leveluser,
                    'redirect' => '/api/auth/user/dashboard' // URL untuk user
                ]);
            }

             return response()->json(['message' => 'Login gagal'], 401);

        // return response()->json([
        //     'user' => $user,
        //     'token' => $token,
        //     'role' => $user->role->leveluser
        // ]);

    }

    // Logout User
    public function logout(Request $request)
    {
        // Hapus semua token
        auth()->user()->tokens()->delete();

        // Hapus session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Berhasil logout'
        ]);
    }

    // Cek Status Autentikasi
    public function me(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'user' => $user,
            'role' => $user->role
        ]);
    }
}
