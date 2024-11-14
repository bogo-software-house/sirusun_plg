<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class BlokController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
          $bloks = Blok::Latest()->paginate(5);
       return new RusunResource(true, 'List Data bloks',$bloks);
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
    public function show(string $id)
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
