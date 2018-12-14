@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>User dashboard</h2>
        <p>
            {{Auth::user()->login}}
        </p>
    </div>
@endsection