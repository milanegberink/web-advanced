<script>
    import {isSidebarOpen} from "../../stores/uiStore.svelte.js";
    const toggleSidebar = () => {
        isSidebarOpen.update(value => !value);
    };
</script>

<button class="flex justify-center items-center" onclick={toggleSidebar}>
    <span class="material-symbols-outlined" id="icon" style:transform={$isSidebarOpen ? 'rotate(0deg)' : 'rotate(-180deg)'}>keyboard_arrow_left</span>
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
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
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
