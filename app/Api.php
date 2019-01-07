<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp;
use Illuminate\Support\Facades\Session;

class Api extends Model
{

    /**
     * API connection to create new user
     *
     * @param $login
     * @param $email
     * @param $password
     * @return int|mixed|\Psr\Http\Message\ResponseInterface
     */
    static public function register ($login, $email, $password)
    {
        $client = new GuzzleHttp\Client();
        try {
            $res = $client->request('GET', 'http://azurix.pl:8080/auth/register?email='.$email.'&login='.$login.'&password='.$password);
            return 1; //TODO: change to `$res->getBody()` when Patyk manage to make return codes...
        } catch (GuzzleHttp\Exception\GuzzleException $e) {
            // No API response
            return 404;
        }

    }

    /**
     * API connection to auth user
     *
     * @param $login
     * @param $password
     * @return int
     */
    static public function login ($login, $password)
    {
        $client = new GuzzleHttp\Client();
        try {
            $res = $client->request('GET', 'http://azurix.pl:8080/auth/login?login='.$login.'&password='.$password)->getBody();
            $res = json_decode($res, true);
            if ($res['id'] > 0) {
                // User with this login && password exist
                // Create session with user credentials
                Session::put([
                    'logged_in' => true,
                    'id'        => $res['id'],
                    'login'     => $res['login'],
                    'authLvl'   => $res['authLvl']
                ]);
                return $res;
            } else {
                // Bad credentials login/pass
                return 401;
            }
        } catch (GuzzleHttp\Exception\GuzzleException $e) {
            // No API response
            return 404;
        }

    }


    /**
     * API connection to auth user
     *
     * @param $passwordOld
     * @param $passwordNew
     * @return int
     */
    static public function changePassword ($passwordOld, $passwordNew)
    {
        $client = new GuzzleHttp\Client();
        try {
            $res = $client->request('PUT', 'http://azurix.pl:8080/user/'.session('id').'/password', [
                'form_params' => [
                    'password'    => $passwordOld,
                    'newPassword' => $passwordNew
                ]
            ])->getBody();
            if ($res == '200') {
                // User successfully changed password
                return 200;
            } else {
                // Bad old password
                return 401;
            }
        } catch (GuzzleHttp\Exception\GuzzleException $e) {
            // No API response
            return 404;
        }

    }
}
