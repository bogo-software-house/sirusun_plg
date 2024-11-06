<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Married_status;
use App\Http\Resources\MarriedstatusesResource;
use Illuminate\Support\Facades\Validator;

class MarriedstatusesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $married_statuses = Married_status::latest()->paginate(5);
        return new MarriedStatusesResource(true, 'List Data Status Menikah', $married_statuses);
    }

    /**
     * Store a newly created resource in storage.
     */
    //buat fungsi store di dalam controller
    public function store(Request $request)
    {
        $request->validate([
            'Married_Status' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Married_status::generateCustomId();

        // Simpan item baru
        $married_statuses = Married_status::create([
            'custom_id' => $customId,
            'Married_Status' => $request->Married_Status,
        ]);
        return new MarriedStatusesResource(true, 'Data Status Menikah Berhasil Ditambahkan!',$married_statuses);
    }

    /**
     * Display the specified resource.
     */
    //buat fungsi show
    public function show(string $custom_id)
    {
        // Temukan Status Menikah berdasarkan ID Status Menikah
        $married_statuses = Married_status::where('custom_id',$custom_id)->first();

        // Periksa apakah Status Menikah ditemukan
        if (!$married_statuses) {
            return response()->json(['message' => 'Status Menikah  not found'], 404);
        }
        return new MarriedStatusesResource(true, 'Detail Status Menikah!', $married_statuses);
    }

    /**
     * Update the specified resource in storage.
     */
    //buat fungsi update
    public function update(Request $request, string $custom_id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'Married_Status' => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan Status Menikah berdasarkan ID Status Menikah
        $married_statuses = Married_status::where('custom_id',$custom_id)->first();
        // Jika Status Menikah tidak ditemukan, ini akan menjadi null
        $married_statuses->update($request->all());
        return new MarriedStatusesResource(true, 'Data Status Menikah berhasil diubah!', $married_statuses);
    }

    /**
     * Remove the specified resource from storage.
     */
    //buat fungsi destroy
    public function destroy(string $custom_id)
    {
        $married_statuses = Married_status::where('custom_id', $custom_id)->first();
        $married_statuses->delete();
        return new MarriedStatusesResource(true, 'Data Status Menikah berhasil dihapus!', null);
    }
}
