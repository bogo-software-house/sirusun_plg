<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Berkas_scan_ktp;
use App\Http\Resources\Berkas_scan_ktpResource;
use Illuminate\Support\Facades\Validator;

class Berkas_scan_ktpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $berkas_scan_ktps = Berkas_scan_ktp::Latest()->paginate(5);
        return new Berkas_scan_ktpResource(true, 'List Data Berkas Scan KTP',$berkas_scan_ktps);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Floor' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Floor::generateCustomId();

        // Simpan item baru
        $floors = Floor::create([
            'custom_id' => $customId,
            'Floor' => $request->Floor,
        ]);
        return new FloorResource(true, 'Data Floor Berhasil Ditambahkan!',$floors);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Floor
        $floor = Floor::where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$floor) {
            return response()->json(['message' => 'Floor  not found'], 404);
        }
        return new FloorResource(true, 'Detail data Floor!', $floor);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'Floor'     => 'required',
            
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan pengguna berdasarkan ID Floor
        $floor = Floor::where('custom_id',$custom_id)->first();
    
        // Jika Rusun tidak ditemukan, ini akan menjadi null
        $floor->update($request->all());
        return new FloorResource(true, 'Data Floor berhasil diubah!', $floor);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $custom_id)
    {
        $floor = Floor::where('custom_id', $custom_id)->first();
        $floor-> delete();
        return new FloorResource(true, 'Data Floor berhasil dihapus!', null);
    }
}
