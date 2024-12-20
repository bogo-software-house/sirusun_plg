<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Room;
use App\Models\Rusun;
use App\Models\ReportRoom;
use Carbon\Carbon;
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


        $rooms = Room::with([
        'unitNumber',
        'status',
        'priceTag.price',
        'damageRoomlantai.condition',
        'damageRoomkusen.condition',
        'damageRoompintu.condition',
        'damageRoomjendela.condition',
        'damageRoomflatfond.condition',
        'damageRoomdinding.condition',
        'damageRoominstalasiair.condition',
        'damageRoominstalasilistrik.condition'
        ])->orderBy('custom_id', 'asc') // Urutkan berdasarkan custom_id secara ascending
        ->paginate(10);
        
        // Periksa apakah pengguna ditemukan
        if (!$rooms) {
            return response()->json(['message' => 'Room not found'], 404);
        }
        return RoomsResource::collection($rooms);
    }

    
    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Status
        $rooms = Room::with([
        'unitNumber',
        'status',
        'priceTag.rusuns',
        'priceTag.bloks',
        'priceTag.floors',
        'priceTag.price',
        'damageRoomlantai.condition',
        'damageRoomkusen.condition',
        'damageRoompintu.condition',
        'damageRoomjendela.condition',
        'damageRoomflatfond.condition',
        'damageRoomdinding.condition',
        'damageRoominstalasiair.condition',
        'damageRoominstalasilistrik.condition'
        ])->where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$rooms) {
            return response()->json(['message' => 'Room not found'], 404);
        }
        return new RoomsResource($rooms);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id) 
    {
        
        //define validation rules
        $validator = Validator::make($request->all(), [
     //          'statuses_custom_id'  => 'sometimes|required|in:IST001,IST002',
                'damage_rooms_lantai_custom_id' => 'sometimes|required| in:IDR001,IDR002,IDR003,IDR004',
                'damage_rooms_kusen_custom_id' => 'sometimes|required|in:IDR005,IDR006,IDR007,IDR008',
                'damage_rooms_pintu_custom_id' => 'sometimes|required|in:IDR009,IDR010,IDR011,IDR012',
                'damage_rooms_jendela_custom_id' => 'sometimes|required|in:IDR013,IDR014,IDR015,IDR016',
                'damage_rooms_fn_flatfond_custom_id' => 'sometimes|required|in:IDR017,IDR018,IDR019,IDR020',
                'damage_rooms_fn_dinding_custom_id' => 'sometimes|required|in:IDR021,IDR022,IDR023,IDR024',
                'damage_rooms_instalasi_listrik_custom_id' => 'sometimes|required|in:IDR025,IDR026,IDR027,IDR028',
                'damage_rooms_instalasi_air_custom_id'  => 'sometimes|required|in:IDR029,IDR030,IDR031,IDR032', 
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }
        

        // Temukan Room berdasarkan ID Room
    $room = Room::where('custom_id', $custom_id)->first();
// dd($room);
    if (!$room) {
        return response()->json(['message' => 'Room not found'], 404);
    }

    // Simpan data kondisi kamar sebelum diubah ke dalam variabel
    $previousCondition = [
                'lantai' => $room->damageRoomlantai && $room->damageRoomlantai->condition ? $room->damageRoomlantai->condition->condition : null,
                'kusen' => $room->damageRoomkusen && $room->damageRoomkusen->condition ? $room->damageRoomkusen->condition->condition : null,
                'pintu' => $room->damageRoompintu && $room->damageRoompintu->condition ? $room->damageRoompintu->condition->condition : null,
                'jendela' =>$room->damageRoomjendela && $room->damageRoomjendela->condition ? $room->damageRoomjendela->condition->condition : null,
                'fn_flatfond' =>$room->damageRoomflatfond && $room->damageRoomflatfond->condition ? $room->damageRoomflatfond->condition->condition : null,
                'fn_dinding' =>$room->damageRoomdinding && $room->damageRoomdinding->condition ? $room->damageRoomdinding->condition->condition : null,
                'instalasi_listrik' =>$room->damageRoominstalasilistrik && $room->damageRoominstalasilistrik->condition ? $room->damageRoominstalasilistrik->condition->condition : null, 
                'instalasi_air' => $room->damageRoominstalasiair && $room->damageRoominstalasiair->condition ? $room->damageRoominstalasiair->condition->condition : null,
    ];

    

    // Update Room 
    $room->update($request->all());

    $update_custom_id = $room->custom_id;
    //ambil lagi data yang baru di update 
    $rooms = Room::where('custom_id', $update_custom_id)->first();
    
    // Simpan data kondisi kamar setelah diubah ke dalam variabel
    $afterCondition = [
            //    'lantai' => $rooms->damageRoomlantai ? $rooms->damageRoomlantai->custom_id : null,
                'lantai' => $rooms->damageRoomlantai && $rooms->damageRoomlantai->condition ? $rooms->damageRoomlantai->condition->condition : null,
             //   'kusen' => $rooms->damageRoomkusen ? $rooms->damageRoomkusen->custom_id : null,
                'kusen' => $rooms->damageRoomkusen && $rooms->damageRoomkusen->condition ? $rooms->damageRoomkusen->condition->condition : null,
             //   'pintu' => $rooms->damageRoompintu ? $rooms->damageRoompintu->custom_id : null,
                'pintu' => $rooms->damageRoompintu && $rooms->damageRoompintu->condition ? $rooms->damageRoompintu->condition->condition : null,
              //  'jendela' =>$rooms->damageRoomjendela ? $rooms->damageRoomjendela->custom_id : null,
                'jendela' =>$rooms->damageRoomjendela && $rooms->damageRoomjendela->condition ? $rooms->damageRoomjendela->condition->condition : null,
             //   'fn_flatfond' =>$rooms->damageRoomflatfond ? $rooms->damageRoomflatfond->custom_id : null,
                'fn_flatfond' =>$rooms->damageRoomflatfond && $rooms->damageRoomflatfond->condition ? $rooms->damageRoomflatfond->condition->condition : null,
             //   'fn_dinding' =>$rooms->damageRoomdinding ? $rooms->damageRoomdinding->custom_id : null,
                'fn_dinding' =>$rooms->damageRoomdinding && $rooms->damageRoomdinding->condition ? $rooms->damageRoomdinding->condition->condition : null,
                //  'instalasi_listrik' =>$rooms->damageRoominstalasilistrik ? $rooms->damageRoominstalasilistrik->custom_id : null,
                  'instalasi_listrik' =>$rooms->damageRoominstalasilistrik && $rooms->damageRoominstalasilistrik->condition ? $rooms->damageRoominstalasilistrik->condition->condition : null,
              //  'instalasi_air' => $rooms->damageRoominstalasiair ? $rooms->damageRoominstalasiair->custom_id : null,
                'instalasi_air' => $rooms->damageRoominstalasiair && $rooms->damageRoominstalasiair->condition ? $rooms->damageRoominstalasiair->condition->condition : null,
    ];

    // Periksa apakah ada perubahan kondisi
    if ($previousCondition !== $afterCondition) {
        // Simpan perubahan kondisi ke dalam tabel report
        ReportRoom::create([
            'room_custom_id' => $rooms->custom_id,
            'bulan' => Carbon::now()->month, // Bulan saat ini
            'tahun' => Carbon::now()->year, // Tahun saat ini
            'kondisi_sebelumnya' => json_encode($previousCondition), 
            'kondisi_setelahnya' => json_encode($afterCondition), 
        ]);
    } else {
        // Jika tidak ada perubahan, Anda bisa menambahkan logika lain jika diperlukan
        // Misalnya, mengembalikan respons atau mencatat log
        return response()->json([
            'success' => false,
            'message' => 'No changes detected in the conditions.'
        ]);
    }
        return new RoomsResource($rooms);
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
    
  public function showAllRoomFromRusun(string $rusun_custom_id)
    {
         // Temukan rusun berdasarkan custom_id
                $rusun = Rusun::where('custom_id', $rusun_custom_id)->first();
                
                if (!$rusun) {
                    return response()->json(['message' => 'Rusun not found'], 404);
                }

        // Temukan pengguna berdasarkan ID Status
        $rooms = Room::with([
        'unitNumber',
        'status',
        'priceTag.rusuns',
        'priceTag.bloks',
        'priceTag.price',
        ])
        ->whereHas('priceTag', function($query) use ($rusun) {
                    $query->where('rusuns_custom_id', $rusun->custom_id);
                })->get();

        // Periksa apakah kamar  ditemukan
                if ($rooms->isEmpty()) {
                    return response()->json(['message' => 'No rooms found'], 404);
                }
            // Kelompokkan kamar berdasarkan blok
                $blokRooms = $rooms->groupBy(function($room) {
                    return $room->priceTag->bloks->blok;
                });

                $response = [
                'rusun' => $rusun->nama_rusun,
                'rusun' => $rusun->kordinat,
                'bloks' => $blokRooms->map(function($rooms, $blok)  {
                    // Kelompokkan per lantai dalam blok
                    $lantaiRooms = $rooms->groupBy(function($room) {
                        return $room->priceTag->floors->floor; // Asumsikan ada relasi ke lantai
                    });
                    return [
                        'blok' => $blok,
                        'lantai' => $lantaiRooms->map(function($roomsPerLantai, $lantai) {
                            return [
                                'lantai' => $lantai,
                               'kamar' => $roomsPerLantai->map(function ($room) {
                                return [
                                    'no_unit' => $room->UnitNumber->no_unit,
                                    'status' => $room->status->status, 
                                    'custom_id' => $room->custom_id, // Pastikan ini ada
                                    ];
                              })->values()
                            ];
                        })->values()
                    ];
                })->values()
            ];

        return response()->json($response);
    }
    
        /**
     * Filter rooms based on rusun, lantai, and blok.
     */
    public function filterRooms(Request $request)
    {
        try {
            // Build query with relationships
            $query = Room::with([
                'priceTag.rusuns',
                'priceTag.bloks',
                'priceTag.floors',
                'unitNumber',
                'damageRoomlantai.condition',
                'damageRoomkusen.condition',
                'damageRoompintu.condition',
                'damageRoomjendela.condition',
                'damageRoomflatfond.condition',
                'damageRoomdinding.condition',
                'damageRoominstalasilistrik.condition',
                'damageRoominstalasiair.condition'
            ]);

            // Filter by rusun
            if ($request->has('rusun')) {
                $query->whereHas('priceTag.rusuns', function($q) use ($request) {
                    $q->where('nama_rusun', 'like', '%' . $request->rusun . '%');
                });
            }

            // Filter by lantai
            if ($request->has('lantai')) {
                $query->whereHas('priceTag.floors', function($q) use ($request) {
                    $q->where('floor', $request->lantai);
                });
            }

            // Filter by blok
            if ($request->has('blok')) {
                $query->whereHas('priceTag.bloks', function($q) use ($request) {
                    $q->where('blok', 'like', '%' . $request->blok . '%');
                });
            }

            // Filter by unit number
            if ($request->has('unit')) {
                $query->whereHas('UnitNumber', function($q) use ($request) {
                    $q->where('no_unit', 'like', '%' . $request->unit . '%');
                });
            }

            // Get the results with pagination
            $rooms = $query->latest()->paginate(10);

            // Check if any rooms were found
            if ($rooms->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No rooms found matching the specified criteria.'
                ], 404);
            }

            // Return the filtered results
            return response()->json([
                'success' => true,
                'data' => RoomsResource::collection($rooms),
                'links' => [
                'first' => $rooms->url(1),
                'last' => $rooms->url($rooms->lastPage()),
                'prev' => $rooms->previousPageUrl(),
                'next' => $rooms->nextPageUrl()
            ],
            'meta' => [
                'current_page' => $rooms->currentPage(),
                'from' => $rooms->firstItem(),
                'last_page' => $rooms->lastPage(),
                'links' => $rooms->linkCollection()->toArray(),
                'path' => $rooms->path(),
                'per_page' => $rooms->perPage(),
                'to' => $rooms->lastItem(),
                'total' => $rooms->total()
            ],
                'message' => 'Rooms retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving rooms',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
}

