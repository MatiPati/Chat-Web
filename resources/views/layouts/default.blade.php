<html>
<head>
    @include('inc.head')
</head>
<body>
    @include('inc.navbar')
    <main class="my-5">
        <div class="container-fluid">
            @include('inc.messages')
            @yield('content')
        </div>
    </main>
</body>
</html>