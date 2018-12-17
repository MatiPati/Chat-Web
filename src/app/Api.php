<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp;
use Illuminate\Support\Facades\Session;

class Api extends Model
{

    static public function login ($login, $password)
    {
        $client = new GuzzleHttp\Client();
        try {

            // TODO: no &action=login at newer version!
            $res = $client->request('GET', 'http://azurix.pl:8080/login?action=login&login=' . $login . '&password=' . $password)->getBody();
            $res = json_decode($res, true);

            if ($res['id'] > 0) {
                // User with this login && password exist
                // Create session with user credentials
                Session::put(['logged_in' => true, 'id' => $res['id'], 'login' => $res['login'], 'api_token' => 'todo']);
                return 200;

            } else {
                // Bad credentials login/pass
                return 401;
            }

        } catch (GuzzleHttp\Exception\GuzzleException $e) {
            // Api not working
            return 404;
        }

    }
}
