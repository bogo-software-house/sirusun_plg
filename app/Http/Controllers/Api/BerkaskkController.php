<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Religion;
use App\Models\BerkasKk;
use App\Http\Resources\BerkaskkResource;
class BerkaskkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
           try {
            // Eager loading
             $berkaskk = BerkasKk::Latest()->with('resident')->get();
             return new BerkaskkResource(true, 'List Data residents', $berkaskk);
            
        } catch (\Exception $e) {
            Log::error('Error fetching residents: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Error fetching residents data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(string $nik)
    {
          // Temukan pengguna berdasarkan NIK
        $berkaskk = BerkasKk::Latest()->with('resident')->where('nik',$nik)->first();

        // Periksa apakah pengguna ditemukan
        if (!$berkaskk) {
            return response()->json(['message' => 'berkaskk  not found'], 404);
        }

        // Kembalikan pengguna sebagai resource
        return new BerkaskkResource(true, 'Detail Data Resident!', $berkaskk);
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
