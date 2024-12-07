<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rusun;
use App\Models\Room;
use App\Http\Resources\RusunResource;
use Illuminate\Support\Facades\Validator;

class RusunController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $rusuns = Rusun::Latest()->get();
       return  RusunResource::collection($rusuns);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_rusun' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'luas' => 'required|string|max:255',
            'blok' => 'required|string|max:255',
            'lantai' => 'required|string|max:255',
            'tahun_pembangunan' => 'required|string|max:255',
            'fasilitas' => 'required|string|max:255',
            'image'     => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

         // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }    

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/rusuns', $image->hashName());


        // Generate custom ID
        $customId = Rusun::generateCustomId();

        // Simpan item baru
        $rusuns = Rusun::create([
            'custom_id' => $customId,
            'Name_Rusun' => $request->Name_Rusun,
            'alamat' => $request->alamat,
            'luas' => $request->luas,
            'blok' => $request->blok,
            'lantai' => $request->lantai,
            'tahun_pembangunan' => $request->tahun_pembangunan,
            'fasilitas' => $request->fasilitas,
            'image' => $image->hashName(),
        ]);

        return new RusunResource($rusuns);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
     // Temukan rusun berdasarkan custom_id
                $rusun = Rusun::where('custom_id', $custom_id)->first();
                
                if (!$rusun) {
                    return response()->json(['message' => 'Rusun not found'], 404);
                }

                // Mengambil data kamar yang kosong berdasarkan rusun dengan kelompok berdasarkan blok
                $availableRooms = Room::with([
                    'unitNumber',
                    'status',
                    'priceTag.rusuns',
                    'priceTag.bloks',
                    'priceTag.price',
                    'damageRoomlantai.condition',
                    'damageRoomkusen.condition',
                    'damageRoompintu.condition',
                    'damageRoomjendela.condition',
                    'damageRoomflatfond.condition',
                    'damageRoomdinding.condition',
                    'damageRoominstalasiair.condition',
                    'damageRoominstalasilistrik.condition'
                ])
                ->whereHas('priceTag', function($query) use ($rusun) {
                    $query->where('rusuns_custom_id', $rusun->custom_id);
                })
                ->where('statuses_custom_id', 'IST001') // Asumsi status 'kosong' menandakan kamar kosong
                ->get();

                // Periksa apakah kamar kosong ditemukan
                if ($availableRooms->isEmpty()) {
                    return response()->json(['message' => 'No available rooms found'], 404);
                }
            // Kelompokkan kamar berdasarkan blok
                $blokRooms = $availableRooms->groupBy(function($room) {
                    return $room->priceTag->bloks->blok;
                });

                $response = [
                'rusun' => $rusun->nama_rusun,
                'image1' => asset('storage/' . $rusun->image1),
                'image2' => asset('storage/' . $rusun->image2),
                'image3' => asset('storage/' . $rusun->image3),
                'image4' => asset('storage/' . $rusun->image4),
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
                                'harga' => $roomsPerLantai->first()->priceTag->price->price, // Harga per lantai
                                'available_rooms_count' => $roomsPerLantai->count(),
                            ];
                        })->values()
                    ];
                })->values()
            ];

        return response()->json($response);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id)
    {
         //define validation rules
        $validator = Validator::make($request->all(), [
            'Name_Rusun'     => 'required',
            
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        
        // Temukan pengguna berdasarkan NIK
        $rusun = Rusun::where('custom_id',$custom_id)->first();

           // Jika Rusun tidak ditemukan, ini akan menjadi null
        $rusun->update($request->all()); // Ini akan menyebabkan kesalahan jika $Rusun adalah null
        return new RusunResource(true, 'Data Rusun berhasil diubah!', $rusun);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $custom_id)
    {
        $rusun = Rusun::where('custom_id', $custom_id)->first();

        $rusun->delete();

        return new RusunResource(true, 'Data Post Berhasil Dihapus!', null);

    }
}
