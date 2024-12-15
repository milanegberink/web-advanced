<script>
    import {route} from '@mateothegreat/svelte5-router';
    import prettifyDate from "../lib/prettifyDate.js";
    import Category from "./Category.svelte";
    import NumberFlow from "@number-flow/svelte";

    let {listing} = $props();
    let {id, name, image, category, auction} = listing;
    let currentPrice = listing.auction.currentPrice;

</script>

<a use:route href="/listings/{id}"
   class="flex justify-between items-center h-[100px] py-2 px-4 rounded-2xl outline outline-2 outline-[var(--color-bg-2)] transition-shadow duration-200 hover:bg-gray-50">
    <div class="rounded-xl aspect-square h-full">
        <img src={image} alt="" class="object-cover">
    </div>
    <span class="text-xl font-medium">{name}</span>
    <Category text={category}/>
    <NumberFlow class="block" value={currentPrice}
                format={{style: "currency", currency: "EUR"}}/>
    <span>{prettifyDate(listing.auction.endDate)}</span>
</a>
