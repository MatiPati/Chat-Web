@extends('layouts.default')

@section('content')

    <div id="auth-box">
        <div class="auth-form">
            <h1 class="mb-0">Register</h1>
            <p class="mb-4">new account to use Ch-APP</p>
            @include('inc.messages')
            <form action="/register" method="post">
                <div class="form-group">
                    <input type="text" name="login" class="form-control" id="login" placeholder="Login"
                           required>
                </div>
                <div class="form-group">
                    <input type="email" name="email" class="form-control" id="email" placeholder="E-mail"
                           required>
                </div>
                <div class="form-group">
                    <input type="password" name="password" class="form-control" id="password"
                           placeholder="Password" required>
                </div>
                <div class="form-group">
                    <input type="password" name="password2" class="form-control" id="password2"
                           placeholder="Confirm password" required>
                </div>
                {{csrf_field()}}
                <button type="submit" class="btn btn-primary"><i class='bx bx-user-plus'></i> Register to Ch-APP</button><br>
                <a href="/login" class="small">Login to existing account</a>
            </form>
        </div>
    </div>

@endsection