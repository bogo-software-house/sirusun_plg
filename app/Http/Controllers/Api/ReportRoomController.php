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
        // Mengambil parameter kueri
        $bulan = $request->query('bulan');
        $tahun = $request->query('tahun');

        // Mulai membangun kueri
        $reports = ReportRoom::with([
            'room.UnitNumber',
            'room.priceTag.rusuns',
            'room.priceTag.bloks',
            'room.priceTag.floors',
            ]);

        // Apply filters if provided
        if ($bulan) {
            $reports->where('bulan', $bulan);
        }

        if ($tahun) {
            $reports->where('tahun', $tahun);
        }

          $reports = $reports->paginate(30); // Menggunakan pagination 10 item per halaman


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
        
        // Buat kunci unik untuk pengelompokan
        $rusunName = $data->room->priceTag->rusuns->nama_rusun ?? null; // Nama rusun
        $blokName = $data->room->priceTag->bloks->blok ?? null; // Nama blok
        $lantaiName = $data->room->priceTag->floors->floor ?? null; // Nama lantai

        // Kunci unik untuk grup
        $groupKey = "{$rusunName}_{$blokName}_{$lantaiName}";

        // Inisialisasi grup jika belum ada
        if (!isset($formattedReports[$groupKey])) {
            $formattedReports[$groupKey] = [
                'rusun' => $rusunName,
                'blok' => $blokName,
                'lantai' => $lantaiName,
                'units' => []
            ];
        }

        // Menyimpan data yang diformat ke dalam array units
        $formattedReports[$groupKey]['units'][] = [
            'unit_number' => $data->room->unitNumber->no_unit ?? null ,// Menyimpan nomor unit
            'room_custom_id' => $data->room_custom_id,
            'bulan' => $data->bulan,
            'tahun' => $data->tahun,
            'sebelum' => $formattedDatasebelum,
            'setelah' => $formattedDatasetelah,
        ];
        }

        // Mengonversi array asosiatif ke array biasa untuk respons
        $formattedReports = array_values($formattedReports);

        // Mengembalikan hasil sebagai respons JSON
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
