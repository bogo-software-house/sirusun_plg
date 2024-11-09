<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::Latest()->with('role')->select('nik','username','tempat_lahir','email')->get();
        return new UserResource(true, 'List Data Users', $users);
    }

    /**
     * Store a newly created resource in storage.
     */
  public function store(Request $request)
{
    // Define validation rules
    $validator = Validator::make($request->all(), [
        'nik'             => 'required|size:16|unique:users,nik', // Pastikan NIK unik
        'username'        => 'required',
        'tempat_lahir'    => 'required',
        'email'           => 'required|email|unique:users,email', // Pastikan email unik
    ]);

    // Check if validation fails
    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Mengambil semua data dari request kecuali 'roles_custom_id'
    $userData = $request->except(['roles_custom_id']); // Ini benar, panggil except() pada $request

    // Create User dengan menggabungkan data user dan roles_custom_id
    $user = User::create(array_merge($userData, ['roles_custom_id' => 'IRL002']));

    // Return response
    return new UserResource(true, 'Data user Berhasil Ditambahkan!', $user);
}

    /**
     * Display the specified resource.
     */
    public function show(string $nik)
    {
         // Temukan pengguna berdasarkan NIK
        $user = User::where('nik',$nik)->first();

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
    public function update(Request $request, $nik)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'username'     => 'required',
            'tempat_lahir'     => 'required',
            'email'   => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        
        // Temukan pengguna berdasarkan NIK
        $user = User::where('nik',$nik)->first();

           // Jika user tidak ditemukan, ini akan menjadi null
    $user->update($request->all()); // Ini akan menyebabkan kesalahan jika $user adalah null
        

        //return response
        return new UserResource(true, 'Data User Berhasil Diubah!', $user);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $nik)
    {
           // Temukan pengguna berdasarkan NIK
        $user = User::where('nik',$nik)->first();

        //delete post
        $user->delete();

        //return response
        return new UserResource(true, 'Data User Berhasil Dihapus!', null);
    }
}
