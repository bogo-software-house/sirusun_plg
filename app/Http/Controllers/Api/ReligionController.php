<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Religion;
use App\Http\Resources\ReligionResource;

class ReligionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
             // Ambil semua data dengan urutan terbaru
       $religions = Religion::latest()->get();
       return new ReligionResource(true,'data religions',$religions);
    
    }

}
