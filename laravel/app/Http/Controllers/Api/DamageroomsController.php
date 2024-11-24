<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Damage_room;
use App\Http\Resources\DamageroomsResource;
use Illuminate\Support\Facades\Validator;

class DamageroomsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $damagerooms = Damage_room::Latest()->paginate(5);
        return new DamageroomsResource(true, 'List Data Damage Rooms',$damagerooms);
    }

    /**
     * Store a newly created resource in storage.
     */
    //buat fungsi store
    public function store(Request $request)
    {
        $request->validate([
            'Noted' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Damage_room::generateCustomId();

        // Simpan item baru
        $damagerooms = Damage_room::create([
            'custom_id' => $customId,
            'Noted' => $request->Noted,
        ]);
        return new DamageroomsResource(true, 'Data Damage Room Berhasil Ditambahkan!',$damagerooms);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Damage Room
        $damagerooms = Damage_room::where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$damagerooms) {
            return response()->json(['message' => 'Damage Room not found'], 404);
        }
        return new DamageroomsResource(true, 'Detail data Damage Room!', $damagerooms);
    }

    /**
     * Update the specified resource in storage.
     */
    //buat fungsi update
    public function update(Request $request, string $custom_id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'Noted'     => 'required',
            
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan pengguna berdasarkan ID Damage Room
        $damagerooms = Damage_room::where('custom_id',$custom_id)->first();
        // Jika Damage Room tidak ditemukan, ini akan menjadi null
        $damagerooms->update($request->all());
        return new DamageroomsResource(true, 'Data Damage Room berhasil diubah!', $damagerooms);
    }

    /**
     * Remove the specified resource from storage.
     */
    //buat fungsi delete
    public function destroy(string $custom_id)
    {
        // Temukan Damage room berdasarkan ID Damage Room
        $damagerooms = Damage_room::where('custom_id', $custom_id)->first();

        // Hapus Demage room
        $damagerooms->delete();
        return new DamageroomsResource(true, 'Data Damage Room berhasil dihapus!', null);
    }
}
