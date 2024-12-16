<script>
    import {onMount} from "svelte";
    import Listing from "../../listing/Listing.svelte";

    let listings = $state();

    let { myProps } = $props();

    let expired = myProps.expired;

    const fetchListings = async () => {
        try {
            const response = await fetch(`http://localhost:3000/listings?expired=${expired}`);
            listings = await response.json();
        } catch (error) {
            console.error('Failed to fetch listings');
        }
    }

    onMount(() => {
        fetchListings();
    });
</script>

<h2 class="text-4xl font-bold mb-5">{!expired ? 'Open Veilingen' : 'Gesloten Veilingen'}</h2>


{#if listings}
    <div class="flex flex-col gap-4">
        {#each listings as listing}
            <Listing {listing}/>
        {/each}
    </div>
{/if}