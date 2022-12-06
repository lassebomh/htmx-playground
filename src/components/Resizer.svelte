<script lang="ts">
    import { onMount } from "svelte";

    let dragging = false;
    let main;

    export let startSize;
    export let endSize;

    onMount(() => {
        main.style.gridTemplateColumns = `${startSize}fr 6px ${endSize}fr`;
    })

    function mousedown(event) {
        dragging = true;
    }

    function mouseup(event) {
        if (!dragging) return;
        dragging = false;
    }

    function mousemove(event) {
        if (!dragging) return;
        
        var rect = main.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        let ratio = x/main.clientWidth;
        main.style.gridTemplateColumns = `${ratio}fr 6px ${1-ratio}fr`;
    }
</script>

<main bind:this={main} on:mouseup={mouseup} on:mousemove={mousemove} class:dragging={dragging}>
    <div class="container">
        <slot name="start" />
    </div>
    <div class="dragbar" draggable="false" on:mousedown={mousedown} />
    <div class="container">
        <slot name="end" />
    </div>
</main>

<style>
    main {
        width: 100%;
        flex-grow: 1;
        
        display: grid;
        grid-template-areas: 'start dragbar end';
        /* grid-template-columns: 1fr 6px 1fr;	 */
    }

    main.dragging {
        cursor: ew-resize;
    }

    main.dragging .container {
        pointer-events: none;
    }

    .container {
        display: flex;
        flex-direction: column;
    }

    .dragbar {
        background: #111;
        background-image: radial-gradient(#555 1px, transparent 0);
        background-size: 3px 3px;
        cursor: ew-resize;
    }

    .dragbar:hover {
        background-image: radial-gradient(#888 1px, transparent 0);
    }
</style>