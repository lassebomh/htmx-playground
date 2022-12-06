<script type="ts">
    import hljs from 'highlight.js'
    import LogView from '../LogView.svelte'

    hljs.configure({ languages: ['http'] })

    let logs = []
    let logI = 0

    window.addEventListener('message', (event) => {
        if (event.data && event.data.type == "network_log") {
            logs = [event.data, ...logs]
            if (logI > 0) logI++;
        }
    })

</script>

<main>
    <input type="checkbox" checked={true} id="toggle">
    <label class="topbar" for="toggle">
        <span>({logs.length}) Requests</span>
        {#if logs[logI] != null}
            <span class="recent-request-url">
                {logs[logI].request.url}
            </span>
        {/if}
    </label>
    <div class="body">
        <div class="log-list">
            {#if logs.length > 0}
                {#each logs as log, i}
                    <button on:click={_ => logI = i} class:active={i == logI}>
                        <div>{log.request.method} {log.request.url}</div>
                        <div>{log.response.status}</div>
                    </button>
                {/each}
            {/if}
        </div>
        {#if logs.length > 0 && logI != null}
            <LogView log={logs[logI]} />
        {/if}
    </div>
</main>

<style>
    main {
        border-top: 1px solid #fff2;
        background-color: #202020;
        height: 41px;
        transition: height .3s ease-in-out;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 10;
        max-height: 100%;
    }

    .recent-request-url {
        font-family: monospace;
        color: #fff7;
    }

    .topbar {
        font-size: 18px;
        display: block;
        padding: 0.5em;
        cursor: pointer;
        background-color: #1b1b1b;
    }

    .topbar:hover {
        background-color: #ffffff05;
    }

    #toggle {
        display: none;
    }

    .body {
        flex-grow: 1;
        border-top: 1px solid #fff2;
        background-color: #222222;
        display: flex;
        height: calc(100% - 41px);
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
        overflow-y: auto;
        font-family: monospace;
    }

    .log-list button.active {
        background-color: #fff1;
    }

    .log-list button:hover {
        background-color: #fff2;
    }

    main:has(#toggle:not(:checked)) {
        height: 50%;
    }

    #toggle:checked ~ .body {
        overflow-y: hidden;
        /* border-top: none; */
    }

    #toggle:checked ~ .body .log-list {
        overflow-y: hidden;
    }
</style>