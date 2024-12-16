<script>
    export let pfpSrc;
</script>

<div id="pfp-container">
    <img src={pfpSrc} alt="">
</div>

<style>
    #pfp-container {
        border-radius: 100%;
        width: 50px;
        height: 50px;
    }

    #pfp-container:hover img {
        cursor: pointer;
        border-color: rgba(0,0,0,0.2);
    }

    #pfp-container:active img {
        transform: scale(0.95);
    }

    img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        object-fit: cover;
        border: 3px solid transparent;
        transition: all 0.3s;
    }
</style>