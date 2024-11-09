<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Religion;

class BerkasktpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
          try {
            // Eager loading
             $berkaskk = BerkasKk::Latest()->with('resident')->get();
             return new ResidentResource(true, 'List Data residents', $berkaskk);
            
        } catch (\Exception $e) {
            Log::error('Error fetching residents: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Error fetching residents data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         // Define validation rules
    $validator = Validator::make($request->all(), [
        'nik'                       => 'required|size:16|unique:users,nik', // Pastikan NIK unik
        'username'                  => 'required',
        'tempat_lahir'              => 'required',
        'tanggal_lahir'             => 'required',
        'genders_custom_id'         => 'required',
        'status_nikah_custom_id'    => 'required',
        'religions_custom_id'       => 'required',
        'education_custom_id'       => 'required',
        'alamat_rumah'              => 'required',
        'no_telp'                   => 'required',
        'penghasilan'               => 'required',
        'pekerjaan'                 => 'required',
        'alamat_tempat_kerja'       => 'required',
        'berkasscanktps_custom_id'  => 'required|email|unique:users,email', // Pastikan email unik
        'berkasscankks_custom_id'   => 'required|email|unique:users,email', // Pastikan email unik
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
