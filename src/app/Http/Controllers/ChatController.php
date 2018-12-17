<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Api;
use Illuminate\Support\Facades\Session;

class ChatController extends Controller
{
    // TODO: index@
    public function index ()
    {
        return view('chat.app');
    }

    /**
     * REST API user register functionality
     * POST FUNCTION
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function register (Request $request)
    {
        // From fields validation
        $request->validate(['login' => 'required|max:32', 'email' => 'required|max:255', 'password' => 'required|min:6|max:255', 'password2' => 'required|same:password']);
        //Get post values
        $login = $request->input('login');
        $email = $request->input('email');
        $password = $request->input('password');
        // Create user
        $res = Api::register($login, $email, $password);
        if ($res == 1) {
            $this->login($request);
            return redirect('/chat')->with('message', 'Successfully registered!');
        } else{
            //TODO: when Patyk manage to done res codes...
        }
    }

    /**
     *  REST API user login functionality
     *  POST FUNCTION
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function login (Request $request)
    {
        // From fields validation
        $request->validate(['login' => 'required', 'password' => 'required']);
        // Get post values
        $login = $request->input('login');
        $password = $request->input('password');
        // Authenticate user
        $res = Api::login($login, $password);
        if ($res == 200) {
            // Logged in session vars added
            return redirect('/chat')->with('message', 'Successfully logged in!');
        } else {
            // Bad credentials
            return redirect('/login')->with('message', 'Bad credentials!');
        }
    }

    /**
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout ()
    {
        // Forget all session vars
        Session::forget(['logged_in', 'id', 'login', 'api_token']);
        return redirect('/login')->with('message', 'Successfully logged out!');
    }

}
