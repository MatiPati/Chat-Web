<html>
<head>
    @include('inc.head')
</head>
<body>
<main>
    @include('inc.navbar')
    <div id="app">
        @yield('content')
    </div>
    @include('inc.footer')
</main>
</body>
</html>