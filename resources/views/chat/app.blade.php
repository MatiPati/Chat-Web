@extends('layouts.chat')

@section('content')

    <div id="chat-app">
        <div class="left-col">
            <div class="profile-box">
                <div class="text-center">
                    <i class='bx bx-id-card h1 mb-0'></i>
                    <p class="m-0" id="user_login">
                        {{session('login')}}
                    </p>
                    <a href="/"><i class='bx bx-home'></i></a>
                    <a href="/logout"><i class='bx bx-log-out'></i></a>
                </div>
            </div>
            <div id="room-list-box">
                {{-- Rooms renders here --}}
            </div>
            <div class="new-room-box">
                <div class="card p-3">
                    <div class="form-group">
                        <input type="text" class="form-control" id="add-room-name" placeholder="Name of new room">
                    </div>
                    <button id="add-room" class="btn btn-primary">Create new room</button>
                    <p class="mb-0 badge badge-danger" id="roomCreateErrors"></p>
                </div>
            </div>
        </div>
        <div class="right-col">




            <div class="d-none" id="active-room">
                <span id="active-room-id" class="d-none"></span>
                <div class="header">
                    <p id="active-room-name"></p>
                    <p id="active-room-creator"></p>
                    <p id="active-room-users"><span id="roomUsers"></span><span onclick="$('#roomAddForm').toggleClass('d-none')"
                                                                      class="badge badge-success position-relative"
                                                                      id="addFormShow" style="bottom: -0.8px;"><i
                                    class="bx bx-plus-circle" title="Add user to room"></i></span></p>
                    <div class="add-form d-none form-group d-none mt-2" id="roomAddForm">
                        <div class="d-flex">
                            <input type="text" id="roomAddInput" class="form-control m-0" placeholder="User login">
                            <button class="btn btn-sm btn-success" onclick="addUser($(this).prev().val())">Add new user
                                to room
                            </button>
                        </div>
                        <p class="mb-0 badge badge-danger" id="roomAddUserErrors"></p>
                    </div>
                </div>
                <div id="room-messages"></div>
                <div class="new-message d-flex">
                    <div class="form-group mb-0">
                        <input type="text" id="new-message-input" class="form-control">
                    </div>
                    <button class="btn btn-primary" id="send-btn">Send</button>
                </div>
            </div>





        </div>
    </div>


    <token_id class="d-none" id="token_id">{{session('api_token')}}</token_id>
    <token_id class="d-none" id="user_id">{{session('id')}}</token_id>

@endsection