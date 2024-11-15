<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Status;
use App\Http\Resources\StatusesResource;
use Illuminate\Support\Facades\Validator;

class StatusesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statuses = Status::Latest()->paginate(5);
        return new StatusesResource(true, 'List Data Statuses',$statuses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Status' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Status::generateCustomId();

        // Simpan item baru
        $statuses = Status::create([
            'custom_id' => $customId,
            'Status' => $request->Status,
        ]);
        return new StatusesResource(true, 'Data Status Berhasil Ditambahkan!',$statuses);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Status
        $statuses = Status::where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$statuses) {
            return response()->json(['message' => 'Status  not found'], 404);
        }
        return new StatusesResource(true, 'Detail data status!', $statuses);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'Status'     => 'required',
            
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan pengguna berdasarkan ID Status
        $statuses = Status::where('custom_id',$custom_id)->first();
    
        // Jika Rusun tidak ditemukan, ini akan menjadi null
        $statuses->update($request->all());
        return new StatusesResource(true, 'Data Status berhasil diubah!', $statuses);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $custom_id)
    {
        $statuses = Status::where('custom_id', $custom_id)->first();
        $statuses-> delete();
        return new StatusesResource(true, 'Data Status berhasil dihapus!', null);
    }
}
