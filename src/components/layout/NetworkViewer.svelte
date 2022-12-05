<script type="ts">
    let logs = []
    let logI = 0

    window.addEventListener('message', (event) => {
        if (event.data && event.data.type == "network_log") {
            logs = [...logs, event.data]
        }
    })
</script>

<main>
    <input type="checkbox" checked={true} id="toggle">
    <label class="topbar" for="toggle">Network Viewer ({logs.length})</label>
    <div class="body">
        <div class="log-list">
            {#if logs.length > 0}
                {#each logs as log, i}
                    <button on:click={_ => logI = i}>
                        <div>{log.request.url}</div>
                        <div>{log.response.status}</div>
                    </button>
                {/each}
            {/if}
        </div>
        <div class="log-viewer">
            {#if logs.length > 0}
                {logs[logI].request.url}
                {logs[logI].response.status}
            {/if}
        </div>
    </div>
</main>

<style>
    main {
        background-color: #2f2f2f;
        height: 42px;
        transition: height 0.3s ease-in-out;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 10;
        max-height: 100%;
    }

    .topbar {
        font-size: 1.2em;
        display: block;
        padding: 0.5em;
        cursor: pointer;
    }

    .topbar:hover {
        background-color: #fff1;
    }

    #toggle {
        display: none;
    }

    .body {
        flex-grow: 1;
        border-top: 1px solid #fff2;
        background-color: #282828;
        display: flex;
        height: calc(100% - 42px);
    }

    .log-list {
        min-width: 200px;
        width: max-content;
        max-width: 40%;
        border-right: 1px solid #fff2;
        overflow-y: auto;
        height: 100%;
    }

    .log-list button {
        font-size: 1rem;
        padding: 0.4em 0.7em;
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-family: monospace;
    }

    .log-list button:hover {
        background-color: #fff1;
    }


    .log-viewer {
        height: 100%;
        flex-grow: 1;
        overflow-y: auto;
    }

    main:has(#toggle:not(:checked)) {
        height: 50%;
    }

    #toggle:checked ~ .body {
        overflow-y: hidden;
        border-top: none;
    }

    #toggle:checked ~ .body .log-list {
        overflow-y: hidden;
    }
    #toggle:checked ~ .body .log-viewer {
        overflow-y: hidden;
    }
</style>