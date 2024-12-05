<script>
    export let icon;
    export let fill;
</script>

<!-- Hier vind je alle icons https://fonts.google.com/icons -->
<span class="material-symbols-outlined {fill ? 'fill' : ''}" id="icon">
    {icon}
</span>

<style>
    #icon.fill {
        font-variation-settings: 'FILL' 1;
    }
</style>