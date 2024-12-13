<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\TransactionRoom;
use App\Models\Room;
use App\Models\User;
use App\Http\Resources\TransactionRoomResource;
class TransactionRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $transactionRoom = TransactionRoom::with(['user.transactionstatusform.residentPdf.resident','user','usernik','room.unitNumber','room.priceTag.price','room.priceTag.bloks'])->Latest()->get();

       return TransactionRoomResource::collection($transactionRoom);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // Define validation rules
    $validator = Validator::make($request->all(), [
        'nik'             => 'required|exists:users,nik|unique:transaction_rooms,nik',
        'rooms_custom_id' => 'required|exists:rooms,custom_id|unique:transaction_rooms,rooms_custom_id',
    ]);

    // Check if validation fails
    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => $validator->errors(),
        ], 422);
    }

    try {
        // Cari user berdasarkan NIK
        $user_custom_id = User::where('nik', $request->nik)->first();

        if (!$user_custom_id) {
            return response()->json([
                'success' => false,
                'message' => 'Pengguna tidak ditemukan.',
            ], 404);
        }

        // Periksa apakah transaksi sudah ada
        $existingTransaction = TransactionRoom::where('users_custom_id', $user_custom_id->custom_id)->first();

        if ($existingTransaction) {
            return response()->json([
                'success' => false,
                'message' => 'Transaksi untuk penghuni ini sudah ada.',
                'error' => 'DuplicateNIK' // Add custom error code for clarity
            ], 422);
        }

        // Buat transaksi baru
        $customId = TransactionRoom::generateCustomId();

        $transactionRoom = TransactionRoom::create([
            'custom_id'       => $customId,
            'nik'             => $request->nik,
            'users_custom_id' => $user_custom_id->custom_id,
            'rooms_custom_id' => $request->rooms_custom_id,
        ]);

        // Mengupdate status kamar menjadi IST002
        $room = Room::where('custom_id', $request->rooms_custom_id)->first();

        if ($room) {
            $room->statuses_custom_id = 'IST002';
            $room->save();
        }

        // Mengembalikan respon sukses
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil disimpan.',
            'data'    => new TransactionRoomResource($transactionRoom),
        ], 200);

    } catch (\Throwable $e) {
        // Tangani error
        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan saat menambahkan transaksi.',
            'error'   => $e->getMessage(),
        ], 500);
    }
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function shownik()
    {
       
    }
}
