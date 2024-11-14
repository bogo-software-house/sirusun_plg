<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Condition;
use App\Http\Resources\ConditionResource;
use Illuminate\Support\Facades\Validator;

class ConditionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conditions = Condition::latest()->paginate(5);
        return new ConditionResource(true, 'List Data Condition', $conditions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Condition' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Condition::generateCustomId();

        // Simpan item baru
        $conditions = Condition::create([
            'custom_id' => $customId,
            'Condition' => $request->Condition,
        ]);
        return new ConditionResource(true, 'Data Condition berhasil ditambahkan!', $conditions);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Complaint
        $conditions = Condition::where('custom_id',$custom_id)->first();

        // Periksa apakah condition ditemukan
        if(!$conditions){
              return response()->json(['message' => 'Condition not found'], 404);
        }
        return new ConditionResource(true, 'Detail data condition!', $conditions);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'Condition'     => 'required',
            
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan pengguna berdasarkan ID Condition
        $condition = Condition::where('custom_id',$custom_id)->first();

        // Jika Condition tidak ditemukan, ini akan menjadi null
        $condition->update($request->all());
        return new ConditionResource(true, 'Data Condition berhasil diubah!', $condition);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $custom_id)
    {
        $condition = Condition::where('custom_id', $custom_id)->first();
        $condition->delete();
        return new ConditionResource(true, 'Data Condition berhasil dihapus!', null);
    }
}
