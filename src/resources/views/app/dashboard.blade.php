@extends('layouts.app')

@section('content')
    <div class="container-fluid px-0 d-flex align-items-center" id="chat-box">
        <div id="chat">
            <div class="row mx-0">
                <div class="col-lg-3 px-0" id="rooms-box">

                    @for($i = 0; $i < 15; $i++)
                        @php
                            $message = "Lorem ipsum dolor sit amet, conse adipiscing elit. Nullam vitae ex ipsum. Nulla ut lacus eget mauris finibus cursus. Cras a sollicitudin risus. Aenean lobortis turpis eu finibus tristique.";
                        @endphp
                        <div class="room">
                            <h5 class="name">Nazwa pokoju</h5>
                            <p class="small users">Login, login, login, login, login</p>
                            <p class="m-0 last-msg">{{str_limit($message, 50, '...')}}</p>
                        </div>
                    @endfor

                </div>
                <div class="col-lg-9 p-0" id="messages-box">

                    <div class="header">
                        <h3 class="name">Nazwa pokoju</h3>
                        <p class="users m-0">Login, login, login, login, login</p>
                    </div>
                    <div class="messages">

                        @for($i = 0; $i < 3; $i++)
                            <div class="message row m-0">
                                        <div class="col-lg-7 bubble">
                                    <p class="user">
                                        Login
                                    </p>
                                    <p class="body">
                                        Lorem ipsum dolor sit amet, conse adipiscing elit. Nullam vitae ex ipsum. Nulla ut lacus eget mauris finibus cursus. Cras a sollicitudin risus. Aenean lobortis turpis eu finibus tristique.
                                    </p>
                                </div>
                            </div>
                            <div class="message row m-0 my">
                                <div class="col-lg-7 bubble">
                                    <p class="user">
                                        Login
                                    </p>
                                    <p class="body">
                                        Lorem ipsum dolor sit amet, conse adipiscing elit. Nullam vitae ex ipsum. Nulla ut lacus eget mauris finibus cursus. Cras a sollicitudin risus. Aenean lobortis turpis eu finibus tristique.
                                    </p>
                                </div>
                            </div>
                        @endfor

                    </div>
                    <div class="input-box form-group m-0">
                        <input class="form-control" placeholder="Aa">
                        <button class="btn btn-primary">SEND</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection