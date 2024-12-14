<script>
    import Sidebar from "./Sidebar.svelte";
    import Profile from "../Profile.svelte";
    import SidebarToggle from "../buttons/SidebarToggle.svelte";
    import {isSidebarOpen} from '../../stores/uiStore.svelte.js';
    import ThemeSwitcher from "../buttons/ThemeSwitcher.svelte";
</script>

<div class="content-wrapper">
    <Sidebar/>
    <section class="main-content" style:border-radius={$isSidebarOpen ? '30px 0 0 30px' : '0'}>
        <header>
            <SidebarToggle/>
            <div class="right-side">
                <span>
                <ThemeSwitcher/>
                    </span>
                <Profile
                        pfpSrc="https://ca-times.brightspotcdn.com/dims4/default/c3b977c/2147483647/strip/true/crop/2000x1405+0+0/resize/1200x843!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc9%2Fa9%2F68435d41cf690e0c019e87278361%2F1f764b198a42470189b99b4084be6cf0"/>
            </div>
        </header>
        <div class="slot-container">
            <slot/>
        </div>
    </section>
</div>


<style>
    .content-wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        height: 100vh;
        width: 100vw;
        background-color: var(--color-bg-0);
        transition: background-color 0.5s;
    }

    .main-content {
        width: 100%;
        height: 100%;
        border-radius: 30px 0 0 30px;
        transition: border-radius 0.3s ease-in-out, background-color 0.5s;
        background-color: var(--color-bg-1);
        overflow: auto;
    }

    .slot-container {
        max-width: 1280px;
        margin: auto;
    }

    header {
        padding: 50px 50px 10px 50px;
        display: flex;
        justify-content: space-between;
    }

    .right-side {
        display: flex;
        flex-direction: row;
    }

    @media (max-width: 1300px) {
        .slot-container {
            margin: 0 50px;
        }
    }

    span {
        margin-right: 20px;
    }
</style>