<script lang="ts">
    import { onMount } from "svelte";   
    import { get } from "svelte/store";
    import { sandbox } from './store'

    let code = get(sandbox).files['main.js']
    let iframe: HTMLIFrameElement;

    onMount(() => {
    })
</script>

<iframe bind:this={iframe} title="Sandbox" src="/sandbox.html" frameborder="0" sandbox="allow-scripts allow-same-origin"></iframe>

<style>
    iframe {
        background-color: white;
        height: inherit;
        width: inherit;
    }
</style>