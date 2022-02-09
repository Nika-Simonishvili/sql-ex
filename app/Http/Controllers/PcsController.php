<?php

namespace App\Http\Controllers;

use App\Models\Pc;
use App\Http\Requests\StorePcRequest;
use App\Http\Requests\UpdatePcRequest;
use App\Models\Product;
use App\Models\Question;

class PcsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePcRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePcRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pc  $pc
     * @return \Illuminate\Http\Response
     */
    public function show(Pc $pc)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pc  $pc
     * @return \Illuminate\Http\Response
     */
    public function edit(Pc $pc)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePcRequest  $request
     * @param  \App\Models\Pc  $pc
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePcRequest $request, Pc $pc)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pc  $pc
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pc $pc)
    {
        //
    }
}
