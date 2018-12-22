<html>
<head>
    @include('inc.head')
    <script src="/js/backend.js" type="application/javascript" defer></script>
</head>
<body>
<main>
    @include('inc.messages')
    @yield('content')
</main>
</body>
</html>