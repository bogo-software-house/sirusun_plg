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
                'statuses_custom_id'  => 'sometimes|required|in:IST001,IST002',
                'damage_rooms_lantai_custom_id' => 'sometimes|required|in:IDR001,IDR002,IDR003,IDR004',
                'damage_rooms_kusen_custom_id' => 'sometimes|required|in:IDR005,IDR006,IDR007,IDR008',
                'damage_rooms_pintu_custom_id' => 'sometimes|required|in:IDR009,IDR010,IDR011,IDR012',
                'damage_rooms_jendela_custom_id' => 'sometimes|required|in:IDR0013,IDR014,IDR015,IDR016',
                'damage_rooms_fn-flatfond_custom_id' => 'sometimes|required|in:IDR017,IDR018,IDR019,IDR020',
                'damage_rooms_fn-dinding_custom_id' => 'sometimes|required|in:IDR021,IDR022,IDR023,IDR024',
                'damage_rooms_instalasi-air_custom_id'  => 'sometimes|required|in:IDR025,IDR026,IDR027,IDR028',
                'damage_rooms_instalasi-listrik_custom_id' => 'sometimes|required|in:IDR029,IDR030,IDR031,IDR032', 
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan Room berdasarkan ID Room
        $rooms = Room::where('custom_id',$custom_id)->first();

        // Jika Room tidak ditemukan, ini akan menjadi null
        $rooms ->update($request->all());

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
