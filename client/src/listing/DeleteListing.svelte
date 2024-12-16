<script>
    import {onMount} from "svelte";
    import Listing from "./Listing.svelte";
    import Icon from "../components/UI/Icon.svelte";

    let listings = $state();

    const fetchListings = async () => {
        try {
            const response = await fetch(`http://localhost:3000/listings`);
            listings = await response.json();
        } catch (error) {
            console.error('Failed to fetch listings');
        }
    }

    async function deleteListing(id) {
        const token = localStorage.getItem('token');
        try {
            await fetch(`http://localhost:3000/listings/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': `Bearer ${token}`}
            });
        } catch (error) {
            console.error('Failed to delete listing');
        }
    }

    onMount(() => {
        fetchListings();
    });
</script>

{#if listings}
    <div class="flex flex-col gap-4">
        {#each listings as listing}
            <Listing {listing}>
                <button onclick={() => deleteListing(listing.id)}>
                    <Icon icon="delete"/>
                </button>
                </Listing>
        {/each}
    </div>
{/if}