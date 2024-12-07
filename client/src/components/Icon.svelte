<script>
    export let icon;
    export let fill = false;
</script>

<span class="material-symbols-outlined {fill ? 'fill' : ''}" id="icon">
    {icon}
</span>

<style>
    #icon.fill {
        font-variation-settings: 'FILL' 1;
    }
</style>