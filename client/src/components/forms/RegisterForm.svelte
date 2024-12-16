<script>
    import {goto, route} from '@mateothegreat/svelte5-router'
    let username = $state();
    let password = $state();

    let errorMessage = $state();

    const registerHandler = async (event) => {
        event.preventDefault();
        await register(username, password);
    };

    const register = async (username, password) => {
        const response = await fetch('http://127.0.0.1:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (response.ok) {
            console.log('Successfully logged in');
            goto('login');
        } else {
            console.error('Failed to login');
            errorMessage = await response.json();
        }
    };


</script>

<form onsubmit={registerHandler} class="inline-block">
    <div class="flex flex-col">
        <label for="username">Username:</label>

        <input type="text"
               id="username"
               name="username"
               minlength="5"
               required
               placeholder="Voer uw gebruikersnaam in"
               bind:value={username}
               class="pr-20  pl-2 py-2 border border-1 rounded-xl"
        >

    </div>
    <div class="flex flex-col">
        <label for="password">Password:</label>

        <input type="password"
               minlength="5"
               id="password"
               name="password"
               placeholder="Voer uw wachtwoord in"
               required
               bind:value={password}
               class="pr-20  pl-2 py-2 border border-1 rounded-xl"
        >

    </div>
    <button type="submit" class="my-4 flex font-medium text-green-700 text-xl bg-gradient-to-b from-green-400 to-green-200 px-10 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95">Login</button>
</form>
<p class="text-red-700">{errorMessage}</p>


<p class="italic opacity-50">Heeft u al een account?</p>
<a use:route href="/login" class="text-blue-500 after:content-['_↗']">Log hier in</a>