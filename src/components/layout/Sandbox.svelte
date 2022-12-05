<script lang='ts'>
    import { srcdoc } from "../../playground";
</script>

<main>
    <iframe srcdoc={$srcdoc} title="Sandbox" frameborder="0" sandbox="allow-scripts"></iframe> 
</main>

<style>
    main {
        flex-grow: 1;
        display: flex;
    }

    iframe {
        width: 100%;
        height: 100%;
    }
</style>
