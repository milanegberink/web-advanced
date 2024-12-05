<script>
    import { Router } from '@mateothegreat/svelte5-router';
    import routes from './lib/routes.svelte.js';
    import UIWrapper from "./components/UIWrapper.svelte";
</script>

<main>
    <UIWrapper>
        <Router {routes}/>
    </UIWrapper>
</main>