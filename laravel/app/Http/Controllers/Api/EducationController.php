<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Education;
use App\Http\Resources\EducationResource;
use Illuminate\Support\Facades\Validator;

class EducationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $educations = Education::latest()->paginate(5);
        return new EducationResource(true, 'List Data Educations', $educations);
    } 

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Education' => 'required',
        ]);

        // Generate custom ID
        $customId = Education::generateCustomId();

        // Simpan item baru
        $educations = Education::create([
            'custom_id' => $customId,
            'Education' => $request->Education,
        ]);
        return new EducationResource(true, 'Data Education Berhasil Ditambahkan!',$educations);
    } 

    /**
     * Display the specified resource.
     */
    public function show(string $custom_id)
    {
        // Temukan pengguna berdasarkan ID Education
        $educations = Education::where('custom_id',$custom_id)->first();

        // Periksa apakah pengguna ditemukan
        if (!$educations) {
            return response()->json(['message' => 'Education not found'], 404);
        }
        return new EducationResource(true, 'Detail data education!', $educations);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $custom_id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'Education'     => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Temukan Education berdasarkan ID Education
        $educations = Education::where('custom_id',$custom_id)->first();

        // Jika Education tidak ditemukan, ini akan menjadi null
        $educations -> update($request->all());
        return new EducationResource(true, 'Data Education berhasil diubah!', $educations);
    }
    /**
     * Remove the specified resource from storage.
     */
    //buat fungsi destroy
    public function destroy(string $custom_id)
    {
        $educations = Education::where('custom_id', $custom_id)->first();
        $educations->delete();
        return new EducationResource(true, 'Data Education berhasil dihapus!', null);
    }
}
