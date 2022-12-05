<script type="ts">
    import hljs from 'highlight.js'

    hljs.configure({ languages: ['http'] })

    let logs = []
    let logI = 0

    window.addEventListener('message', (event) => {
        if (event.data && event.data.type == "network_log") {
            logs = [event.data, ...logs]
        }
    })

    function highlightHttpRequest(e) {
        let log = logs[logI]
        let code = ""

        code += `${log.request.method} ${log.request.url} HTTP/1.1\n`

        for (let [key, value] of Object.entries(log.request.headers)) {
            code += `${key}: ${value}\n`
        }

        if (log.request.body) code += "\n" + log.request.body + "\n"

        e.innerHTML = hljs.highlight('http', code).value;
    }

    function highlightHttpResponse(e) {
        let log = logs[logI]
        let code = ""

        code += `HTTP/1.1 ${log.response.status} ${log.response.statusText || ""}\n`
        
        for (let [key, value] of Object.entries(log.response.headers)) {
            code += `${key}: ${value}\n`
        }

        if (log.response.body) code += "\n" + log.response.body + "\n"

        e.innerHTML = hljs.highlight('http', code).value;
    }

</script>

<main>
    <input type="checkbox" checked={true} id="toggle">
    <label class="topbar" for="toggle">
        ({logs.length}) Network Viewer<span style="font-family: monospace;">{(logs[logI] && (": " + logs[logI].request.url)) || ""}</span>
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
        <div class="log-viewer">
            {#if logs.length > 0}
                <div>
                    <h4 class="log-header" style="border-top: 0;">Request</h4>
                    <pre use:highlightHttpRequest></pre>
                </div>
                <div>
                    <h4 class="log-header">Response</h4>
                    <pre use:highlightHttpResponse></pre>
                </div>
            {/if}
        </div>
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

    pre {
        padding: 16px;
        margin: 0;
        white-space: pre-line;
    }

    .log-viewer {
        height: 100%;
        flex-grow: 1;
        overflow-y: auto;
        font-family: monospace;
    }

    .log-header {
        padding: 8px;
        margin: 0;
        color: #fff9;
        font-weight: 400;
        border-bottom: 1px #fff3 solid;
        border-top: 1px #fff3 solid;
    }

    .topbar {
        font-size: 18px;
        display: block;
        padding: 0.5em;
        cursor: pointer;
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
        background-color: #282828;
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
        border-top: none;
    }

    #toggle:checked ~ .body .log-list {
        overflow-y: hidden;
    }
    #toggle:checked ~ .body .log-viewer {
        overflow-y: hidden;
    }
</style>