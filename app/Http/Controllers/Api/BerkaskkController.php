<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BerkasKk;
use App\Http\Resources\BerkaskkResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
class BerkaskkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    try {
        // Eager loading dengan select kolom
        $berkaskk = BerkasKk::latest()
            ->with('resident')
            ->select('id', 'nik', 'file_path', 'created_at', 'updated_at')
            ->get();

        // Log untuk debugging
        Log::info('Fetched BerkasKk', [
            'count' => $berkaskk->count()
        ]);

        return new BerkaskkResource(true, 'List Data residents', $berkaskk);
    } catch (\Exception $e) {
        Log::error('Error fetching residents: ' . $e->getMessage(), [
            'trace' => $e->getTraceAsString()
        ]);
        
        return response()->json([
            'success' => false,
            'message' => 'Error fetching residents data',
            'error' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
   public function show($nik)
{
    try {
        $berkaskk = BerkasKk::where('nik', $nik)
            ->select(['nik', 'file_name', 'file_path'])
            ->first();

        if (!$berkaskk) {
            return response()->json([
                'message' => 'Data tidak ditemukan',
                'nik' => $nik
            ], 404);
        }

        // Pastikan mendapatkan objek, bukan array
        $berkaskk = $berkaskk instanceof Model ? $berkaskk : (object) $berkaskk;

        $fileUrl = $berkaskk->file_path && Storage::exists($berkaskk->file_path)
            ? Storage::url($berkaskk->file_path)
            : null;

        $data = [
            'nik' => $berkaskk->nik,
            'file_name' => $berkaskk->file_name,
            'file_path' => $fileUrl,
        ];

        return new BerkaskkResource($data);

    } catch (\Exception $e) {
        // Tangani error dengan logging
        Log::error('Error in show method: ' . $e->getMessage());
        
        return response()->json([
            'message' => 'Terjadi kesalahan',
            'error' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
}
