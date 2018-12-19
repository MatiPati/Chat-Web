<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/">Chat-Web</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        @if(@session('logged_in'))
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="/chat">
                        <i class="bx bx-message h4 m-0 pr-2"></i>Chat
                    </a>
                </li>
            </ul>
        @endif
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="https://github.com/MatiPati"
                   target="_blank">
                    <i class="bx bxl-github h4 m-0 pr-2"></i>Github
                </a>
            </li>
            @if(@session('logged_in'))
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="/logout">
                        <i class='bx bx-log-in h4 m-0 pr-2'></i>Logout
                    </a>
                </li>
            @else
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="/login">
                        <i class='bx bx-log-out h4 m-0 pr-2'></i> Login
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="/register">
                        Register
                    </a>
                </li>
            @endif
        </ul>
    </div>
</nav>