@extends('layouts.chat')

@section('content')

    <div id="app">
        <chat user-id="{{session('id')}}" user-login="{{session('login')}}"></chat>
    </div>

@endsection