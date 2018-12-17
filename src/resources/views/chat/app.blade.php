@extends('layouts.default')

@section('content')

    <p>
        Zalogowany jako - {{session('login')}} <= {{session('id')}}
    </p>

@endsection