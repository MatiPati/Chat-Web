<?php

namespace App\Http\Middleware;

use Closure;

class Logged
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle ($request, Closure $next)
    {
        if (session('logged_in') != true) {
            return redirect('/login')->withErrors('First you need to login!');
        }
        return $next($request);
    }
}
