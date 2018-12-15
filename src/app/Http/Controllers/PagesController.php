<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    /**
     * Show the main page.
     *
     * @return \Illuminate\Http\Response
     */
    public function getHome()
    {
        return view('home');
    }

    /**
     * Show chat app dashboard
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getAppDashboard(){
        return view('app.dashboard');
    }
}
