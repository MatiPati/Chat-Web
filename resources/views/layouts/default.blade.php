<html>
<head>
    <title>Chat-Web</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    {{-- Meta-informations --}}
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Mateusz Ożóg">
    <meta name="description" content="">
    <meta name="keywords" content="">
    {{-- Styles --}}
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
    <link rel='stylesheet' href='https://unpkg.com/boxicons@1.8.1/css/boxicons.min.css'>
    {{-- Scripts --}}
    <script src="/js/app.js" type="application/javascript"></script>
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