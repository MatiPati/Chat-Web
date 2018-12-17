<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp;

class Api extends Model
{

    static public function login ($login, $password)
    {
        $client = new GuzzleHttp\Client();
        try {

            // TODO: no &action=login at newer version!
            $res = $client->request('GET', 'azurix.pl:8080/login?action=login&login=' . $login . '&password=' . $password)->getBody();
            $res = json_decode($res, true);

            if ($res['id'] > 0) {

                // TODO: User needs to be authorized
                // TODO: session
                /*
                 * TODO: User session vars:
                 *   logged_in
                 *   id
                 *   login
                 *   api_token
                 **/
                return 200;


            } else {
                return 401;
            }

        } catch (GuzzleHttp\Exception\GuzzleException $e) {
            return 404;
        }

    }
}
