<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\TransactionRoom;
use App\Models\Room;
use App\Models\User;
use App\Models\TransactionHistory;
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
    // Validasi request
    $validator = Validator::make($request->all(), [
        'nik'             => 'required|exists:users,nik|unique:transaction_rooms,nik',
        'rooms_custom_id' => 'required|exists:rooms,custom_id|unique:transaction_rooms,rooms_custom_id',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Cek user dan transaksi yang sudah ada
    $user = User::where('nik', $request->nik)->first();
    $existingTransaction = TransactionRoom::where('users_custom_id', $user->custom_id)->first();

    if ($existingTransaction) {
        return response()->json([
            'success' => false,
            'message' => 'Transaksi untuk penghuni ini sudah ada.'
        ], 422);
    }

    try {
        // Ambil data room dengan relasinya
        $room = Room::with([
            'priceTag.rusuns',
            'priceTag.bloks',
            'priceTag.floors',
            'UnitNumber',
            'status'
        ])->where('custom_id', $request->rooms_custom_id)->first();

        
        // Buat transaksi baru
        $customId = TransactionRoom::generateCustomId();
        $transactionRoom = TransactionRoom::create([
            'custom_id' => $customId,
            'nik' => $request->nik,
            'users_custom_id' => $user->custom_id,
            'rooms_custom_id' => $request->rooms_custom_id,
        ]);

        // Refresh dan load relasi
        $transactionRoom->refresh();
        $transactionRoom->load(['user','room.status','room.priceTag.bloks', 'room.priceTag.rusuns', 'room.priceTag.floors', 'room.UnitNumber']);

        // Log history transaksi room
        $this->logTransactionHistory($transactionRoom, $user, $room);

        // Update dan log history status room
        $this->updateAndLogRoomStatus($room);

        return new TransactionRoomResource($transactionRoom);

    } catch (\Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal menambahkan transaction',
            'error' => $e->getMessage()
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
    public function destroy(string $custom_id)
    {
        // Cari transaksi berdasarkan custom_id
        $transactionDestroy = TransactionRoom::where('custom_id', $custom_id)->first();

        // Periksa apakah transaksi ditemukan
        if (!$transactionDestroy) {
            return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
        }

        // Cari kamar berdasarkan custom_id kamar dari transaksi
        $room = Room::where('custom_id', $transactionDestroy->rooms_custom_id)->first();

        // Periksa apakah kamar ditemukan
        if (!$room) {
            return response()->json(['message' => 'Data kamar tidak ada'], 404);
        }


        
        // Log history before deletion
        TransactionHistory::createHistory(
            TransactionRoom::class, 
            $custom_id, 
            'Deleted Add Resident', 
            $transactionDestroy->toArray(), 
            null
        );

        // Log room status change
        TransactionHistory::createHistory(
            Room::class, 
            $room->custom_id, 
            'status_reset', 
            ['statuses_custom_id' => $room->statuses_custom_id], 
            ['statuses_custom_id' => 'IST001']
        );

        // Update status kamar kembali ke IST001
        $room->update([
            'statuses_custom_id' => 'IST001'
        ]);

        // Hapus transaksi (opsional, tergantung kebutuhan Anda)
        $transactionDestroy->delete();

        return response()->json(['message' => 'Berhasil mereset status kamar'], 200);
    }


 
    private function logTransactionHistory($transactionRoom, $user, $room)
{
    $newData = [
        'transaction' => [
            'custom_id' => $transactionRoom->custom_id,
            'nik' => $transactionRoom->nik,
        ],
        'user' => [
            'nik' => $user->nik,
            'username' => $user->username,
        ],
        'room' => [
            'custom_id' => $room->custom_id,
            'rusun' => $room->priceTag?->rusuns?->nama_rusun,
            'blok' => $room->priceTag?->bloks?->blok,
            'lantai' => $room->priceTag?->floors?->floor,
            'unit_number' => $room->unitNumber?->no_unit,
        ]
    ];

    TransactionHistory::createHistory(
        TransactionRoom::class,
        $transactionRoom->custom_id,
        'Add Resident',
        null,
        $newData
    );
}

private function updateAndLogRoomStatus($room)
{
   // dd($room->unitNumber);

 
    $oldData = [
        'custom_id' => $room->custom_id,
        'statuses_custom_id' => $room->statuses_custom_id,
        'status' => $room->status->status,
        'unit_number' => $room->unitNumber ? $room->unitNumber->no_unit : null
    ];

    $room->statuses_custom_id = 'IST002';
    $room->save();
    $room->refresh();

    $newData = [
        'custom_id' => $room->custom_id,
        'statuses_custom_id' => $room->statuses_custom_id,
        'status' => $room->status->status,
        'unit_number' => $room->unitNumber ? $room->unitNumber->no_unit : null
    ];

    TransactionHistory::createHistory(
        Room::class,
        $room->custom_id,
        'Status Room Updated',
        $oldData,
        $newData
    );
}
}
