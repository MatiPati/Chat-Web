@extends('layouts.default')

@section('content')

    <div id="home-slider">
        <div class="slider-text">
            <h1>Ch-APP</h1>
            <p>
                The world's first Chatting-APP which uses Ch-API
            </p>
            <div class="mt-5">
                <a href="/register" class="btn btn-primary">
                    <i class='bx bx-user-plus'></i> Register account
                </a>
                <a href="/login" class="btn btn-primary">
                    <i class='bx bx-user-check'></i> Login
                </a>
            </div>
        </div>
    </div>

@endsection