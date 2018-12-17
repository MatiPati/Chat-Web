@extends('layouts.chat')

@section('content')

    <div class="row">
        <div class="col-lg-12">
            <h1 class="text-right">
                Logged as - {{session('login')}} <= {{session('id')}}
            </h1>
            <hr>
        </div>
        <div class="col-lg-9">
            <div class="card p-2">
                <h3>Room name</h3>
                <p class="m-0">User user user</p>
            </div>
        </div>
        <div class="col-lg-3">
            <div id="newroom-box">
                <div class="form-group">
                    <label for="name">Create new room</label>
                    <input type="text" class="form-control" id="add-room-name" placeholder="Enter name">
                </div>
                <button id="add-room" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>

    <token_id class="d-none" id="token_id">{{session('api_token')}}</token_id>
    <token_id class="d-none" id="user_id">{{session('id')}}</token_id>

@endsection