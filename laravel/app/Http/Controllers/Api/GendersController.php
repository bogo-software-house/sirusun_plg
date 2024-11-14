<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gender;
use App\Http\Resources\GendersResource;
use Illuminate\Support\Facades\Validator;

class GendersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $genders = Gender::Latest()->paginate(5);
        return new GendersResource(true, 'List Data Gender', $genders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Gender' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Gender::generateCustomId();

        // Simpan item baru
        $genders = Gender::create([
            'custom_id' => $customId,
            'Gender' => $request->Gender,
        ]);
        return new GendersResource(true, 'Data Gender Berhasil Ditambahkan!',$genders);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Gender
        $genders = Gender::where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$genders) {
            return response()->json(['message' => 'Gender not found'], 404);
        }
        return new GendersResource(true, 'Gender details!', $genders);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'Gender' => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan gender berdasarkan ID Gender
        $genders = Gender::where('custom_id',$custom_id)->first();
        // Jika gender tidak ditemukan, ini akan menjadi null
        $genders->update($request->all());
        return new GendersResource(true, 'Data Gender berhasil diubah!', $genders);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $custom_id)
    {
        $genders = Gender::where('custom_id',$custom_id)->first();
        $genders->delete();
        return new GendersResource(true, 'Data Gender berhasil dihapus!', null);
    }
}
