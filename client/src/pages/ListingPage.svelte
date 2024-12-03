<script>
    import {onMount} from "svelte";
    import NumberFlow from '@number-flow/svelte'

    let testDate = $state();

    let { params } = $props();
    const listingId = params.listingId;

    let listingData = $state("Loading");

    const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:3000/listings/${listingId}`);
        listingData = await response.json();
        testDate = new Date(listingData.date);
    }

    let seconds = $state(0);
    let minutes = $state(0);
    let hours = $state(0);
    let days = $state(0);

    const updateTime = () => {
        const now = new Date();
        const diffInMs = testDate.getTime() - now;

        days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) - 1;
        minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
    };
    onMount(() => {
        fetchData();
        updateTime();
    });

    setInterval(updateTime, 1000);

</script>

<div class="container font-bold">
    <div>
    <NumberFlow value={seconds} />
        <h2>Seconds</h2>
    </div>
    <div>
        <NumberFlow value={minutes} />
        <h2>Minutes</h2>
    </div>
    <div>
        <NumberFlow value={hours} />
        <h2>Hours</h2>
    </div>
    <div>
        <NumberFlow value={days} />
        <h2>Days</h2>
    </div>
</div>

<h1 class="bg-amber-600 text-4xl">{listingData.name}</h1>
<h1>{listingData.date}</h1>


<style lang="postcss">
    .container div {
        display: flex;
        align-items: baseline;
    }

    h2 {
        font-size: .75rem;
        margin-left: 2px;
        opacity: 50%;
    }
</style>


