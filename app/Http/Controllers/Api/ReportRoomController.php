<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ReportRoom;

class ReportRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }
    public function indextahun(Request $request)
    {
        // Retrieve query parameters
        $bulan = $request->query('bulan');
        $tahun = $request->query('tahun');

        // Start building the query
        $reports = ReportRoom::query();

        // Apply filters if provided
        if ($bulan) {
            $reports->where('bulan', $bulan);
        }

        if ($tahun) {
            $reports->where('tahun', $tahun);
        }

        // Execute the query and get the results
        $reports = $reports->get();

        // Check if reports were found
        if ($reports->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No reports found for the specified criteria.'
            ], 404);
        }


        // Inisialisasi array untuk menyimpan data yang diformat
        $formattedReports = [];

        // Iterasi melalui setiap laporan
        foreach ($reports as $data) {
            // Mengonversi JSON string menjadi array
            $dataArraysebelum = json_decode($data->kondisi_sebelumnya, true);
            $dataArraysetelah = json_decode($data->kondisi_setelahnya, true);

            // Mengelompokkan data sebelum
            $formattedDatasebelum = [
                "material" => [
                    "lantai" => $dataArraysebelum['lantai'],
                    "kusen" => $dataArraysebelum["kusen"],
                    "pintu" => $dataArraysebelum["pintu"],
                    "jendela" => $dataArraysebelum["jendela"],
                    "flatfond" => $dataArraysebelum["fn_flatfond"],
                    "dinding" => $dataArraysebelum["fn_dinding"]
                ],
                "instalasi" => [
                    "instalasi_air" => $dataArraysebelum["instalasi_air"],
                    "instalasi_listrik" => $dataArraysebelum["instalasi_listrik"]
                ]
            ];

        // Mengelompokkan data setelah
        $formattedDatasetelah = [
            "material" => [
                "lantai" => $dataArraysetelah["lantai"],
                "kusen" => $dataArraysetelah["kusen"],
                "pintu" => $dataArraysetelah["pintu"],
                "jendela" => $dataArraysetelah["jendela"],
                "flatfond" => $dataArraysetelah["fn_flatfond"],
                "dinding" => $dataArraysetelah["fn_dinding"]
            ],
            "instalasi" => [
                "instalasi_air" => $dataArraysetelah["instalasi_air"],
                "instalasi_listrik" => $dataArraysetelah["instalasi_listrik"]
            ]
        ];

        // Menyimpan data yang diformat ke dalam array
        $formattedReports[] = [
            'room_custom_id' => $data->room_custom_id,
            'bulan' => $data->bulan,
            'tahun' => $data->tahun,
            'sebelum' => $formattedDatasebelum,
            'setelah' => $formattedDatasetelah
            ];
        }

        // Return the results as a JSON response
        return response()->json([
            'success' => true,
            'data' => $formattedReports,
            'message' => 'Reports retrieved successfully.'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

  

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       
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
