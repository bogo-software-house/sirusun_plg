<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Information;
use App\Http\Resources\InformationResource;
use Illuminate\Support\Facades\Validator;

class InformationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $informations = Information::latest()->paginate(5);
        return new InformationResource(true, 'List Data Informasi',$informations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Description' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Information::generateCustomId();

        // Simpan item baru
        $informations = Information::create([
            'custom_id' => $customId,
            'Description' => $request->Description,
        ]);
        return new InformationResource(true, 'Data Informasi Berhasil Ditambahkan!',$informations);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan Informasi berdasarkan ID Informasi
        $informations = Information::where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$informations) {
            return response()->json(['message' => 'Informasi  not found'], 404);
        }
        return new InformationResource(true, 'Detail Informasi!', $informations);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'Description' => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan informasi berdasarkan ID informasi
        $informations = Information::where('custom_id',$custom_id)->first();
    
        // Jika Informasi tidak ditemukan, ini akan menjadi null
        $informations->update($request->all());
        return new InformationResource(true, 'Data Informasi berhasil diubah!', $informations);
    }

    /**
     * Remove the specified resource from storage.
     */
    //buat fungsi destroy
    public function destroy(string $custom_id)
    {
        $informations = Information::where('custom_id',$custom_id)->first();
        $informations->delete();
        return new InformationResource(true, 'Data Informasi berhasil dihapus!', null);
    }
}
