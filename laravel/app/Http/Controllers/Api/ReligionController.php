<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Religion;
use App\Http\Resources\ReligionResource;
use Illuminate\Support\Facades\Validator;

class ReligionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    //buat fungsi index
    public function index()
    {
        $religions = Religion::Latest()->paginate(5);
        return new ReligionResource(true, 'List Data Religion', $religions);
    }

    /**
     * Store a newly created resource in storage.
     */
    //buat fungsi store
    public function store(Request $request)
    {
        $request->validate([
            'Religion' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Religion::generateCustomId();

        // Simpan item baru
        $religions = Religion::create([
            'custom_id' => $customId,
            'Religion' => $request->Religion,
        ]);
        return new ReligionResource(true, 'Data Religion Berhasil Ditambahkan!',$religions);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Religion
        $religions = Religion::where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$religions) {
            return response()->json(['message' => 'Religion not found'], 404);
        }
        return new ReligionResource(true, 'Detail data religion!', $religions);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id) 
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'Religion'     => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan Religion berdasarkan ID Religion
        $religions = Religion::where('custom_id',$custom_id)->first();

        // Jika Religion tidak ditemukan, ini akan menjadi null
        $religions ->update($request->all());
        return new ReligionResource(true, 'Data Religion berhasil diubah!', $religions);
    }

    /**
     * Remove the specified resource from storage.
     */
    //buat fungsi destroy
    public function destroy(string $custom_id)
    {
        $religions = Religion::where('custom_id', $custom_id)->first();
        $religions->delete();
        return new ReligionResource(true, 'Data Religion berhasil dihapus!', null);
    }
}
