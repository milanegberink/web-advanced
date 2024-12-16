<script>
    import NewListingForm from "../../../components/forms/NewListingForm.svelte";
    import DeleteListing from "../../../listing/DeleteListing.svelte";
    let currentActivity = $state();
</script>

<h1 class="text-4xl font-bold">Beheer Veilingen</h1>

<div class="flex flex-row gap-2">
<button onclick={() => currentActivity = 'newListing'} class="my-4 flex font-medium text-green-700 text-xl bg-gradient-to-b from-green-400 to-green-200 px-10 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95">Create</button>
<button onclick={() => currentActivity = 'deleteListing'} class="my-4 flex font-medium text-red-700 text-xl bg-gradient-to-b from-red-400 to-red-200 px-10 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95">Delete</button>
</div>

{#if currentActivity === 'newListing'}
    <NewListingForm/>
{/if}

{#if currentActivity === 'deleteListing'}
    <DeleteListing/>
{/if}
