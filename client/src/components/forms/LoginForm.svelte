<script>
    import {goto, route} from '@mateothegreat/svelte5-router'
    let username = $state();
    let password = $state();

    const loginHandler = async (event) => {
        event.preventDefault();
        await login(username, password);
    };

    const login = async (username, password) => {
        const response = await fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            goto('/listings');
        } else {
            console.error('Failed to login');
        }
    };


</script>

<form onsubmit={loginHandler} action="/login" method="POST">
    <div class="flex flex-col">
    <label for="username">Username:</label>

    <input type="text"
           id="username"
           name="username"
           required
           bind:value={username}
    >

    </div>
    <div class="flex flex-col">
    <label for="password">Password:</label>

    <input type="password"
           id="password"
           name="password"
           required
           bind:value={password}
    >

    </div>
    <button type="submit">Login</button>
</form>

<p class="italic">Nog géén account?</p>
<a use:route href="/register">Meld u hier aan</a>