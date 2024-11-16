<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
      // Pastikan user sudah login
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = Auth::user();

    // Log informasi pengguna dan peran mereka
      Log::info('Authenticated user', [
        'user_id' => $user->id,
        'username' => $user->username,
        'role' => $user->role ? $user->role->leveluser : 'No Role'
    ]);

        // Periksa apakah user memiliki role yang sesuai
        if (!$user->role || !in_array($user->role->leveluser, $roles)) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }

    
}