<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/">Chat-Web</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
            @if(@session('logged_in'))
                <li class="nav-item dropdown">
                    <a class="nav-link dropleft dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Logged as: {{session('login')}}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="/chat">Chat APP</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="/changepassword">Change password</a>
                        <a class="dropdown-item" href="/logout">Logout</a>
                    </div>
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
            <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="https://github.com/MatiPati"
                   target="_blank">
                    <i class="bx bxl-github h4 m-0 pr-2"></i>Github
                </a>
            </li>
        </ul>
    </div>
</nav>