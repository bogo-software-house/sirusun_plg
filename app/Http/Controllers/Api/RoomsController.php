<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Room;
use App\Http\Resources\RoomsResource;
use Illuminate\Support\Facades\Validator;

class RoomsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    //buat fungsi index
    public function index()
    {
        $rooms = Room::Latest()->paginate(5);
        return new RoomsResource(true, 'List Data Rooms', $rooms);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Noted' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Room::generateCustomId();

        // Simpan item baru
        $rooms = Room::create([
            'custom_id' => $customId,
            'Noted' => $request->Noted,
        ]);
        return new RoomsResource(true, 'Data Room Berhasil Ditambahkan!',$rooms);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Status
        $rooms = Room::where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$rooms) {
            return response()->json(['message' => 'Room not found'], 404);
        }
        return new RoomsResource(true, 'Detail data room!', $rooms);
    }

    /**
     * Update the specified resource in storage.
     */
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

        // Temukan Room berdasarkan ID Room
        $rooms = Room::where('custom_id',$custom_id)->first();

        // Jika Room tidak ditemukan, ini akan menjadi null
        $statuses ->update($request->all());
        return new RoomsResource(true, 'Data Room berhasil diubah!', $rooms);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $custom_id)
    {
        $rooms = Status::where('custom_id', $custom_id)->first();
        $rooms-> delete();
        return new RoomsResource(true, 'Data Status berhasil dihapus!', null);
    }
}
