<script>
    import {isSidebarOpen} from '../stores/uiStore.svelte.js';
    import NavLink from "./NavLink.svelte";
    import navLinks from "../lib/navLinks.svelte.js";
</script>

<nav id="sidebar" class={$isSidebarOpen ? 'open' : ''}>
    <div class="sidebar-content">
        <ul>
            {#each navLinks as link, index}
                <NavLink href={link.href} text={link.text} icon={link.icon}/>
                {#if index === navLinks.length-2}
                    <hr>
                {/if}
            {/each}
        </ul>
    </div>
</nav>

<style>
    #sidebar {
        position: relative;
        flex-direction: column;
        height: 100%;
        transition: width 350ms ease-out;
        overflow: hidden;
        width: 0;
    }

    #sidebar.open {
        width: 400px;
    }

    #sidebar.open .sidebar-content {
        opacity: 1;
        transition: opacity 200ms 300ms;
    }

    .sidebar-content {
        margin: 50px 30px;
        opacity: 0;
        transition: opacity 150ms;
    }

    ul {
        padding: 0;
        margin-top: 10px;
    }

    hr {
        border: 1px dashed var(--color-bg-2);
        margin: 30px 0;
    }
</style>
