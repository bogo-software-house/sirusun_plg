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
        'nik'                          => 'required|exists:users,nik|unique:transaction_rooms,nik',
        'rooms_custom_id'              => 'required|exists:rooms,custom_id|unique:transaction_rooms,rooms_custom_id',
        ]);



        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user_custom_id = User::where('nik', $request->nik)->first();

    // Periksa apakah TransactionRoom dengan users_custom_id yang sama sudah ada
    $existingTransaction = TransactionRoom::where('users_custom_id', $user_custom_id->custom_id)->first();

    if ($existingTransaction) {
        // Jika TransactionRoom dengan users_custom_id yang sama sudah ada, 
        // tampilkan pesan error atau tangani sesuai kebutuhan
        return response()->json([
            'success' => false,
            'message' => 'Transaksi untuk penghuni ini sudah ada.'
        ], 422); 
    } else {
        // Jika belum ada TransactionRoom dengan users_custom_id yang sama, 
    // lanjutkan dengan membuat TransactionRoom   
         try {
            //pembuatan custom id transaksi
            $customId = TransactionRoom::generateCustomId();

            $transactionRoom = TransactionRoom::create([
                'custom_id' => $customId,
                'nik' => $request->nik,
                'users_custom_id' => $user_custom_id->custom_id,
                'rooms_custom_id' => $request->rooms_custom_id,
            ]);

           // Mengubah statuses_custom_id di tabel rooms menjadi IST002
        $room = Room::where('custom_id', $request->rooms_custom_id)->first();
        if ($room) {
            $room->statuses_custom_id = 'IST002';
            $room->save();
        }

        // Mengembalikan respons sukses
        return new TransactionRoomResource($transactionRoom);

        } catch (\Throwable $e) {
           // Tangani error yang mungkin terjadi
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan transaction',
                'error' => $e->getMessage()
            ], 500);
        }


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
