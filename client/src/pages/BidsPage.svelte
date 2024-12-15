<script>
    import {onMount} from "svelte";
    import NumberFlow from "@number-flow/svelte";
    import {route} from '@mateothegreat/svelte5-router'
    import Icon from "../components/Icon.svelte";

    let bids = $state();

    const fetchBids = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/bids', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            bids = await response.json();
            bids.reverse();
        } catch (error) {
            console.error(error);
        }
    }

    onMount(() => {
        fetchBids();
    });
</script>

<h1 class="text-4xl font-bold mb-4">Jouw Biedingen</h1>

{#snippet bid(name, listingId, amount, currentPrice)}
<span class="text-xl">{name}</span>
<div>
    <span>Your bid:</span>
    <NumberFlow class="text-xl" value={amount}
                format={{style: "currency", currency: "EUR"}}/>
    {#if currentPrice === amount}
        <Icon icon="check"/>
    {/if}
</div>
<div>
    <span>Current price:</span>
    <NumberFlow class="text-xl mb-3" value={currentPrice}
                format={{style: "currency", currency: "EUR"}}/>
</div>
<a use:route href="/listings/{listingId}"
   class="font-medium text-l bg-gradient-to-t from-purple-100 to-purple-300 rounded-full py-1 px-3 text-purple-700"
>Go to listing</a>
{/snippet}

<div class="flex gap-2 flex-wrap">
{#each bids as _bid}
    <div class="outline outline-1 outline-[var(--color-bg-0)] p-4 rounded-xl hover:bg-gray-50">
        {@render bid(_bid.name, _bid.listingId, _bid.bid.amount, _bid.currentPrice)}
    </div>
{/each}
</div>