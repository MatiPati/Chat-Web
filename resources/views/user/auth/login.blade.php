@extends('layouts.default')

@section('content')

    <div id="auth-box">
        <div class="auth-form">
            <h1 class="mb-0">Login</h1>
            <p class="mb-4">to Ch-APP</p>
            @include('inc.messages')
            <form action="/login" method="post">
                <div class="form-group">
                    <input type="text" name="login" class="form-control" id="login" placeholder="Login"
                           placeholder="Password" required>
                </div>
                <div class="form-group">
                    <input type="password" name="password" class="form-control" id="password"
                           placeholder="Password" placeholder="Password" required>
                </div>
                {{csrf_field()}}
                <button type="submit" class="btn btn-primary"><i class='bx bx-log-in'></i> Login to Ch-APP</button><br>
                <a href="/register" class="small">Create account</a>
            </form>
        </div>
    </div>

@endsection