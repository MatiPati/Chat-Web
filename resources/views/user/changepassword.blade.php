@extends('layouts.default')

@section('content')

    <div class="row">
        <div class="col-lg-6">
            <h1 class="mb-5">Change password</h1>
            <form action="/changepassword" method="post">
                <div class="form-group">
                    <input type="password" name="passwordOld" class="form-control" id="password"
                           placeholder="Old password" required>
                </div>
                <div class="form-group">
                    <input type="password" name="passwordNew" class="form-control" id="password"
                           placeholder="New password" required>
                </div>
                <div class="form-group">
                    <input type="password" name="passwordNewConfirm" class="form-control" id="password"
                           placeholder="Confirm password" required>
                </div>
                {{csrf_field()}}
                <button type="submit" class="btn btn-primary">Change password</button>
            </form>
        </div>
    </div>

@endsection
