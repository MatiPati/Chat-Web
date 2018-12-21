@extends('layouts.default')

@section('content')
    @include('inc.navbar')

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
                <a href="/register" class="btn btn-primary">
                    <i class='bx bx-user-check'></i> Log-in
                </a>
            </div>
        </div>
        <div class="slider-img"></div>
        <div class="github p-4">
            <a href="#" target="_blank"><i class="bx bxl-github h1 m-0"></i></a>
            <p class="mt-3 mb-0 small">Powered by <a href="https://azurix.pl" target="_blank">azurix.pl</a></p>
        </div>
    </div>



@endsection