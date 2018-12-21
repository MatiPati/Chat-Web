<html>
<head>
    @include('inc.head')
    <script src="/js/backend.js" type="application/javascript" defer></script>
</head>
<body>
    <main class="my-5">
        <div class="container-fluid">
            @include('inc.messages')
            @yield('content')
        </div>
    </main>
</body>
</html>