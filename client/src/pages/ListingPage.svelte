<script>
    import {onMount} from "svelte";
    import NumberFlow from '@number-flow/svelte'
    import Bid from "../components/Bid.svelte";
    import {fly} from 'svelte/transition';
    import Category from "../components/Category.svelte";

    const {params} = $props();
    const listingId = params.listingId;

    let bid = $state();
    let isBidding = $state(false);


    let endDate = $state();
    let expired = $state();
    let currentPrice = $state(0);
    let image = $state();
    let bids = $state([]);
    let category = $state();

    let errorMessage = $state();

    let timeLeft = $state({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    let listingData = $state(0);

    const fetchListing = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/listings/${listingId}`);
            listingData = await response.json();
            endDate = new Date(listingData.auction.endDate);
            currentPrice = listingData.auction.currentPrice;
            image = listingData.image;
            bids = listingData.auction.bids;
            category = listingData.category;
            bids.sort((a, b) => b.amount - a.amount);
            updateTime();
        } catch {
            console.error("Failed to fetch listing");
        }
    };

    const updateTime = () => {
        const now = new Date().getTime();
        const diffInMs = endDate.getTime() - now;

        if (diffInMs - 3600000 < 0) {
            expired = true;
            return;
        }

        const totalSeconds = Math.floor(diffInMs / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        timeLeft.days = totalDays;
        timeLeft.hours = totalHours % 24;
        timeLeft.minutes = totalMinutes % 60;
        timeLeft.seconds = totalSeconds % 60;
    };

    const submitBid = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3000/bids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    bidAmount: bid,
                    listingId: listingId
                })
            });

            await fetchListing();

            if(!response.ok) {
                errorMessage = await response.json();
            }

            if (response.ok) {
                isBidding = false;
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    onMount(() => {
        fetchListing();
        setInterval(updateTime, 1000);
    });

</script>

<svelte:head>
    <title>{listingData.name}</title>
</svelte:head>

{#snippet time(unit, text)}
<li class="flex items-baseline">
    <NumberFlow class="font-bold text-4xl text-[color:--color-text]" value={unit}/>
    <span class="mr-5 ml-2 font-medium text-2xl opacity-50">{text}</span>
</li>
{/snippet}

<div class="w-full h-full flex flex-col justify-center items-center md:flex-col lg:flex-row" >
    <div class="w-full h-[50rem] p-3">
        <div class="container bg-white mb-3 w-full aspect-square outline outline-1 outline-[--color-bg-2] rounded-xl">
            <img src={image} alt="" class="object-cover">
        </div>
        <h2 class="font-bold text-4xl mb-2">{listingData.name}</h2>
        <NumberFlow class="text-[--color-text] font-bold text-3xl mb-2 block" value={currentPrice}
                    format={{style: "currency", currency: "EUR"}}/>
        <Category text={category}/>
        <p class="mt-4 opacity-50 text-pretty">{listingData.description}</p>
    </div>
    <div class="w-full h-[50rem] p-3">
        {#each bids as bid, index}
            <div transition:fly={{ x: -20, duration: 200, delay: index * 50 }}>
                {#if index === 0}
                    <h2 class="font-bold text-2xl my-5">Top tien</h2>
                    <Bid bidder={bid.bidder} amount={bid.amount} highest={true}/>
                    <hr class="mb-5">
                {:else if index < 10}
                    <Bid bidder={bid.bidder} amount={bid.amount}/>
                {/if}
            </div>
        {/each}
        {#if !expired}
            <ul class="flex mb-5 mt-10">
                {@render time(timeLeft.days, "Dagen")}
                {@render time(timeLeft.hours, "Uur")}
                {@render time(timeLeft.minutes, "Minuten")}
                {@render time(timeLeft.seconds, "Seconden")}
            </ul>
            {#if !isBidding}
                <button id="place-bid" onclick={() => isBidding = true} popovertarget="new-bid-popover"
                        class="flex font-medium text-blue-700 text-xl bg-gradient-to-b from-blue-400 to-blue-200 px-10 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95">
                    Plaats bod
                </button>
            {:else}
                <form onsubmit={submitBid}>
                    <button id="place-bid"
                            type="submit"
                            class="mb-2 flex font-medium text-green-700 text-xl bg-gradient-to-b from-green-400 to-green-200 px-10 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95">
                        Bevestig bod
                    </button>
                    <input type="number"
                           required
                           min={currentPrice + 1}
                           placeholder="Bod"
                           class="p-1 outline outline-1 rounded-xl"
                           bind:value={bid}>
                </form>
                <h1 class="text-red-700">{errorMessage}</h1>
            {/if}
        {:else}
            <h2 class="font-bold text-4xl text-red-400 mb-5">Veiling is voorbij</h2>
        {/if}

    </div>
</div>
