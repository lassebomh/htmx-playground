<script lang="ts">
    let dragging = false;
    let main;

    export let startSize;
    export let endSize;

    function init(main) {
        main.style.display = 'grid';
        main.style.gridTemplateAreas = 'start dragbar end';
        main.style.gridTemplateColumns = `${startSize} 6px ${endSize}`;
    }

    function mousedown(event) {
        dragging = true;
    }

    function mouseup(event) {
        if (!dragging) return;
        dragging = false;

        if (window['editor']) {
            window['editor'].resize()
        }
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

{#if $$slots.end && $$slots.start}
    <main bind:this={main} on:mouseup={mouseup} on:mousemove={mousemove} class:dragging={dragging} use:init>
        <div class="container">
            <slot name="start" />
        </div>
        <div class="dragbar" draggable="false" on:mousedown={mousedown} />
        <div class="container">
            <slot name="end" />
        </div>
    </main>
{:else}
    <main bind:this={main}>
        <div class="container">
            {#if $$slots.start}
                <slot name="start" />
            {:else}
                <slot name="end" />
            {/if}
        </div>
    </main>
{/if}

<style>
    main {
        width: 100%;
        flex-grow: 1;
    }

    main.dragging {
        cursor: ew-resize;
    }

    main.dragging .container {
        pointer-events: none;
        user-select: none;
    }

    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
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