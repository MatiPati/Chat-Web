@extends('layouts.app')

@section('content')
    <div class="container">
        <h1 class="mb-5">Strona główna</h1>
        <div class="jumbotron">
            <p class="mb-1">
                Odpowiedź od api (azurix.pl:8080):
            </p>
            <p id="api-res" class="h2"></p>
        </div>
    </div>
@endsection
