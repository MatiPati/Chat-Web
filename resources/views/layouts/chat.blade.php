<html>
<head>
    @include('inc.head')
</head>
<body>
<main>
    @include('inc.messages')
    {{--@yield('content')--}}
    <div id="app">
        <chat :user-id="{{session('id')}}"></chat>
    </div>
</main>
</body>
</html>