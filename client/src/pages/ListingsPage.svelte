<script>
    import {onMount} from "svelte";
    import Listing from "../components/Listing.svelte";

    let listings = $state();

    const fetchListings = async () => {
        try {
            const response = await fetch('http://localhost:3000/listings');
            listings = await response.json();
        } catch (error) {
            console.error('Failed to fetch listings');
        }
    }

    onMount(() => {
        fetchListings();
    });
</script>

<h2 class="text-4xl font-bold">Open Veilingen</h2>


{#if listings}
    <div class="flex flex-col">
        {#each listings as listing}
            <Listing id={listing.id}/>
        {/each}
    </div>
{/if}