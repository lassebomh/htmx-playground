<script lang="ts">
    import { onMount } from "svelte";   
    import { get } from "svelte/store";
    import { sandbox } from './store'

    let code = get(sandbox).files['main.js']
    let iframe: HTMLIFrameElement;

    window.addEventListener('message', (event) => {
        console.log('recieved: ' + event.data)
        console.log(event)
    })

    onMount(() => {
    })
</script>

<iframe bind:this={iframe} title="Sandbox" src="/sandbox.html" frameborder="0" sandbox="allow-scripts"></iframe>

<style>
    iframe {
        background-color: white;
        height: inherit;
        width: inherit;
    }
</style>