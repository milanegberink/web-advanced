<script>
    import Icon from "./Icon.svelte";
    import {route} from "@mateothegreat/svelte5-router";
    import {currentRoute} from "../stores/uiStore.svelte.js";

    let {href, text, icon} = $props();

    const isActive = () => {
        return $currentRoute === href;
    }

</script>

<li>
    <a use:route onclick={$currentRoute = window.location.pathname} href={href} class={isActive() ? 'active' : ''}>
        <Icon icon={icon} fill={isActive()}/>
        <span>
            {text}
        </span>
    </a>
</li>

<style>
    a {
        display: flex;
        align-items: center;
        border-radius: 18px;
        margin-bottom: 10px;
        padding: 20px;
        transition: all 0.3s;
        font-weight: 600;
        opacity: 50%;
        font-size: 1.25rem;
    }

    a.active {
        background-color: var(--color-bg-2);
        opacity: 80%;
    }

    a.active::after, a:not(.active)::after {
        content: '';
        position: absolute;
        width: 5px;
        height: 50px;
        background-color: var(--color-primary);
        border-radius: 5px 0 0 5px;
        right: 1px;
        transition: all 200ms;
    }

    a:not(.active)::after {
        height: 15px;
        background-color: var(--color-text);
        opacity: 50%;
    }

    a:hover:not(.active)::after {
        height: 30px;
    }

    a:hover {
        cursor: pointer;
    }

    a:hover:not(.active) {
        background-color: var(--color-bg-2);
    }

    span {
        margin-left: 10px;
    }

</style>