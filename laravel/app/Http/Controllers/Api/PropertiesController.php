<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Http\Resources\PropertiesResource;
use Illuminate\Support\Facades\Validator;

class PropertiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::Latest()->paginate(5);
        return new PropertiesResource(true, 'List Data Property',$properties);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Property' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Property::generateCustomId();

        // Simpan item baru
        $properties = Property::create([
            'custom_id' => $customId,
            'Property' => $request->Property,
        ]);
        return new PropertiesResource(true, 'Data Property Berhasil Ditambahkan!',$properties);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Property
        $properties = Property::where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$properties) {
            return response()->json(['message' => 'Property  not found'], 404);
        }
        return new PropertiesResource(true, 'Detail data Property!', $properties);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'Property'     => 'required',
            
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan pengguna berdasarkan ID Property
        $properties = Property::where('custom_id',$custom_id)->first();
    
        // Jika Rusun tidak ditemukan, ini akan menjadi null
        $properties->update($request->all());
        return new PropertiesResource(true, 'Data Property berhasil diubah!', $properties);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $custom_id)
    {
        $properties = Property::where('custom_id', $custom_id)->first();
        $properties-> delete();
        return new PropertiesResource(true, 'Data property berhasil dihapus!', null);
    }
}
