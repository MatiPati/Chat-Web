<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Api;

class ChatController extends Controller
{

    public function index ()
    {
        Api::test();
    }

    // TODO: as post only && return
    /**
     *  REST login functionality
     *
     * @param $login
     * @param $password
     */
    public function login ($login, $password) {

        return Api::login($login, $password);

    }

}
