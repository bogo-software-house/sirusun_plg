<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Unit_number;
use App\Http\Resources\UnitnumberResource;
use Illuminate\Support\Facades\Validator;

class UnitnumberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $unit_numbers = Unit_number::Latest()->paginate(5);
        return new UnitnumberResource(true, 'List Data Unit Numbers', $unit_numbers);
    }

    /**
     * Store a newly created resource in storage.
     */
    //buat fungsi store
    public function store(Request $request)
    {
        $request->validate([
            'No_Unit' => ['required','string','max:255'],
        ]);

        // Generate custom ID
        $customId = Unit_number::generateCustomId();

        // Simpan item baru
        $unit_numbers = Unit_number::create([
            'custom_id' => $customId,
            'No_Unit' => $request->No_Unit,
        ]);
        return new UnitnumberResource(true, 'Data Unit Number Berhasil Ditambahkan!',$unit_numbers);
    }

    /**
     * Display the specified resource.
     */
    //buat fungsi show
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Status
        $unit_numbers = Unit_number::where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$unit_numbers) {
            return response()->json(['message' => 'Unit Number  not found'], 404);
        }
        return new UnitnumberResource(true, 'Detail data Unit Number!', $unit_numbers);
    }

    /**
     * Update the specified resource in storage.
     */
    //buat fungsi update
    public function update(Request $request, string $custom_id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'No_Unit'     => 'required',  
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan No.Unit berdasarkan ID Status
        $unit_numbers = Unit_number::where('custom_id',$custom_id)->first();

        // Jika No.Unit tidak ditemukan, ini akan menjadi null
        $unit_numbers->update($request->all());
        return new UnitnumberResource(true, 'Data Unit Number berhasil diubah!', $unit_numbers);
    }

    /**
     * Remove the specified resource from storage.
     */
    //buat fungsi destroy
    public function destroy(string $custom_id)
    {
        $unit_numbers = Unit_number::where('custom_id', $custom_id)->first();
        $unit_numbers->delete();
        return new UnitnumberResource(true, 'Data Unit Number Berhasil Dihapus!', null);
    }
}
