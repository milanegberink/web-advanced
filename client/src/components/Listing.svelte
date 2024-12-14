<script>
    import {route} from '@mateothegreat/svelte5-router';

    let {id} = $props();
</script>


<a use:route href="/listings/{id}" class="h-[100px] rounded-2xl outline outline-2 outline-[var(--color-bg-2)]">
    Test
</a>
