<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::Latest()->with('role')->get();
        return new UserResource(true, 'List Data Users', $users);

    }

    /**
     * Store a newly created resource in storage.
     */

//   public function store(Request $request)
// {
//     // Define validation rules
//     $validator = Validator::make($request->all(), [
//         'nik'             => 'required|size:16|unique:users,nik', // Pastikan NIK unik
//         'username'        => 'required',
//         'tempat_lahir'    => 'required',
//         'email'           => 'required|email|unique:users,email', // Pastikan email unik
//     ]);

//     // Check if validation fails
//     if ($validator->fails()) {
//         return response()->json($validator->errors(), 422);
//     }

//     // Mengambil semua data dari request kecuali 'roles_custom_id'
//     $userData = $request->except(['roles_custom_id']); // Ini benar, panggil except() pada $request

//     // Create User dengan menggabungkan data user dan roles_custom_id
//     $user = User::create(array_merge($userData, ['roles_custom_id' => 'IRL002']));

//     // Return response
//     return new UserResource(true, 'Data user Berhasil Ditambahkan!', $user);
// }
 /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $customId)
    {
         // Temukan pengguna berdasarkan NIK
        $user = User::where('custom_id',$customId)->first();

        // Periksa apakah pengguna ditemukan
        if (!$user) {
            return response()->json(['message' => 'User  not found'], 404);
        }

        // Kembalikan pengguna sebagai resource
        return new UserResource(true, 'Detail Data User!', $user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $customId)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function updatepassword(Request $request)
    {
            // Mendapatkan pengguna yang sedang login
        $user = Auth::user();

        // Mendefinisikan aturan validasi
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:8', // Menambahkan konfirmasi password
        ]);

        // Memeriksa apakah validasi gagal
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Memperbarui password pengguna
        $user->update([
            'password' => bcrypt($request->password),
        ]);

        // Mengembalikan response
        return new UserResource(true, 'Data User Berhasil Diubah!', $user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $customId)
    {
           // Temukan pengguna berdasarkan customId
        $user = User::where('custom_id',$customId)->first();

        //delete user
        $user->delete();

        //return response
        return new UserResource(true, 'Data User Berhasil Dihapus!', null);
    }
}
