<script>
    import {theme, setTheme} from "../../stores/uiStore.svelte.js";

    $: if ($theme) {
        document.documentElement.setAttribute('data-theme', $theme);
    }

    const toggleTheme = () => {
        $theme = $theme === 'dark' ? 'light' : 'dark';
        setTheme($theme);
    };
</script>

<button class="flex justify-center items-center" onclick={toggleTheme}>
    <span class="material-symbols-outlined" id="icon">{$theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
</button>

<style>
    button {
        width: 50px;
        height: 50px;
        background-color: transparent;
        border: 1px solid var(--color-bg-2);
        border-radius: 16px;
        transition: all 0.3s;
    }

    button:hover {
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        transform: scale(1.05);
    }

    button:active {
        transform: scale(0.95);
    }

    #icon {
        transition: transform 0.4s ease-in-out;
        opacity: 50%;
    }
</style>
