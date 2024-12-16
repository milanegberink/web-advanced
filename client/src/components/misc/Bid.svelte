<script>
    import Icon from "../UI/Icon.svelte";

    export let bidder;
    export let amount;
    export let highest = false;
</script>

<div class="p-1 w-full rounded-xl flex justify-between mb-5">
    <div class="flex justify-center items-center">
        {#if highest}
            <Icon icon="trophy" fill={true}/>
        {/if}
    <span class="text-xl text-blue-500">@{bidder}</span>
    </div>
    <span class="text-xl font-medium">€ {amount}</span>
</div>

