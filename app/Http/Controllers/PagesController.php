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

    public function getLogin ()
    {
        return view('auth.login');
    }

    public function getRegister  ()
    {
        return view('auth.register');
    }

}
