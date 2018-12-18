<html>
<head>
    @include('layouts.head')
    <script src="/js/backend.js" type="application/javascript" defer></script>
</head>
<body>
    @include('inc.navbar')
    <main class="my-5">
        <div class="container">
            @include('inc.messages')
            @yield('content')
        </div>
    </main>
</body>
</html>