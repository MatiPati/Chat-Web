<?php

namespace App\Http\Controllers;

use App\Api;
use Illuminate\Http\Request;

class PagesController extends Controller
{

    /**
     * @return view('home')
     */
    public function getHome ()
    {
        return view('home');
    }

}
