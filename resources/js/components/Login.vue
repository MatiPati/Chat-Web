<template>
    <div class="login">
        <div id="auth-box">
            <div class="auth-form">
                <h1 class="mb-0">Login</h1>
                <p class="mb-4">to Ch-APP</p>
                <form action="/login" method="post">
                    <div class="form-group">
                        <input type="text" name="login" class="form-control" id="login" placeholder="Login" required>
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" class="form-control" id="password"
                               placeholder="Password" required>
                    </div>
                    <button type="submit" class="btn btn-primary"><i class='bx bx-log-in'></i> Login to Ch-APP</button><br>
                    <a href="/register" class="small">Create account</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {

            }
        },
        methods: {
            
        }
    }
</script>