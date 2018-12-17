@extends('layouts.default')

@section('content')

    <div class="row">
        <div class="col-lg-6">
            <h1 class="mb-5">Login</h1>
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
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>

@endsection