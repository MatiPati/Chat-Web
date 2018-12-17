@extends('layouts.default')

@section('content')

    <div class="row">
        <div class="col-lg-6">
            <h1 class="mb-5">Register</h1>
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
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>

@endsection