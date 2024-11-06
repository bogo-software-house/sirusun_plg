<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Complaint;
use App\Http\Resources\ComplaintResource;
use Illuminate\Support\Facades\Validator;

class ComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $complaints = Complaint::Latest()->paginate(5);
        return new ComplaintResource(true, 'List Data Complaints',$complaints);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Complaint' => 'required|string|max:255',
        ]);

        // Generate custom ID
        $customId = Complaint::generateCustomId();

        // Simpan item baru
        $complaints = Complaint::create([
            'custom_id' => $customId,
            'Complaint' => $request->Complaint,
        ]);
        return new ComplaintResource(true, 'Data Complaint Berhasil Ditambahkan!',$complaints);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Complaint
        $complaint = Complaint::where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$complaint) {
            return response()->json(['message' => 'Complaint  not found'], 404);
        }
        return new ComplaintResource(true, 'Detail data complaint!', $complaint);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'Complaint'     => 'required',
            
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan pengguna berdasarkan ID Complaint
        $complaint = Complaint::where('custom_id',$custom_id)->first();
    
        // Jika complaint tidak ditemukan, ini akan menjadi null
        $complaint->update($request->all());
        return new ComplaintResource(true, 'Data Complaint berhasil diubah!', $complaint);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $custom_id)
    {
        $complaint = Complaint::where('custom_id', $custom_id)->first();
        $complaint-> delete();
        return new ComplaintResource(true, 'Data Complaint berhasil dihapus!', null);
    }
}
