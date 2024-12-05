<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PriceTag;
use App\Http\Resources\PriceTagResource;
use Illuminate\Support\Facades\Validator;


class PriceTagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pricetags= PriceTag::latest()->get();
        return PriceTagResource::collection($pricetags);

    }
}
