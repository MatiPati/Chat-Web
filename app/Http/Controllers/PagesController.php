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
        return view('user.auth.login');
    }

    public function getRegister  ()
    {
        return view('user.auth.register');
    }

    public function getChangePassword  ()
    {
        return view('user.changepassword');
    }

}
