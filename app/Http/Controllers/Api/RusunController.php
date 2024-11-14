<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rusun;
use App\Http\Resources\RusunResource;
use Illuminate\Support\Facades\Validator;

class RusunController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $rusuns = Rusun::Latest()->paginate(5);
       return new RusunResource(true, 'List Data Rusun',$rusuns);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Name_Rusun' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Rusun::generateCustomId();

        // Simpan item baru
        $rusuns = Rusun::create([
            'custom_id' => $customId,
            'Name_Rusun' => $request->Name_Rusun,
        ]);

        return new RusunResource(true, 'Data user Berhasil Ditambahkan!',$rusuns);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
       // Temukan pengguna berdasarkan NIK
        $rusun = Rusun::where('custom_id',$custom_id)->first();
        if(!$rusun){
              return response()->json(['message' => 'User  not found'], 404);
        }
         return new RusunResource(true, 'Detail data rusun!', $rusun);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id)
    {
         //define validation rules
        $validator = Validator::make($request->all(), [
            'Name_Rusun'     => 'required',
            
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        
        // Temukan pengguna berdasarkan NIK
        $rusun = Rusun::where('custom_id',$custom_id)->first();

           // Jika Rusun tidak ditemukan, ini akan menjadi null
        $rusun->update($request->all()); // Ini akan menyebabkan kesalahan jika $Rusun adalah null
        return new RusunResource(true, 'Data Rusun berhasil diubah!', $rusun);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $custom_id)
    {
        $rusun = Rusun::where('custom_id', $custom_id)->first();

        $rusun->delete();

        return new RusunResource(true, 'Data Post Berhasil Dihapus!', null);

    }
}
