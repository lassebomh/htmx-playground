<script lang='ts'>
    import { srcdoc } from "../../playground";
</script>

<main>
    <iframe srcdoc={$srcdoc} title="Sandbox" frameborder="0" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms"></iframe> 
</main>

<style>
    main {
        position: relative;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    iframe {
        width: 100%;
        height: 100%;
    }
</style>
