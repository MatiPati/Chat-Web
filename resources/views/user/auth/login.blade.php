@extends('layouts.default')

@section('content')

    <login csrf-token="{{ csrf_token() }}"></login>

@endsection