<script lang='ts'>
    import monaco from '../monaco';

    export let logs: any[];
    export let mobile: boolean;

    let index = 0;
    let viewLog: any = null;

    function moveIndex(logs: any[]) {
        if (logs.length == 0) {
            index = 0;
            viewLog = null;
        } else {
            if (index > 0) {
                index = index + 1;
            }
            index = Math.min(index, logs.length-1)
            viewLog = logs[index]
        }
    }

    $: {
        if (logs.length < index) {
            viewLog = null;
        } else {
            viewLog = logs[index]
            
            if (responseBody) {
                update(responseBody, viewLog.responseBody, viewLog.responseBodyType)
            }
            if (requestBody) {
                update(requestBody, viewLog.requestBody, viewLog.requestBodyType)
            }
        }
    }

    let responseBody: HTMLElement;
    let requestBody: HTMLElement;

    function update(elem: HTMLElement, body: string | null, mimeType: string) {
        elem.textContent = body || ''

        if (body != null) {
            elem.setAttribute('data-lang', mimeType)
    
            monaco.editor.colorizeElement(elem, {
                theme: "vs-dark",
                mimeType,
                tabSize: 2
            })
        }
    }

    $: moveIndex(logs)
    
</script>

<main>
	<!-- <button disabled={logs.length == 0} on:click={_ => _} class="clear-button icon-button">
		<i class="codicon codicon-circle-slash"></i>
	</button> -->
    <div class="logs" style={mobile ? 'display: none;' : ''}>
        {#each logs as log, i}
            <button on:click={_ => index = i} class:active={index == i} class="log">
                <span>
                    <span>{log.method}</span>
                    <span>{log.url.pathname}</span>
                </span>
                <span class="status-dot" style="--status-color: var(--status-{log.statusN});"></span>
            </button>
        {/each}
    </div>
    <div class="log-viewer">
        {#if viewLog != null}
            <div class='log-title'>
                <span>
                    <span style="color: var(--value)">{viewLog.method}</span>
                    <span style="color: var(--key)">{viewLog.url.pathname}</span>
                </span>
                <span class="status-dot" style="--status-color: var(--status-{viewLog.statusN}); color: var(--status-color)">{viewLog.status}</span>
            </div>
            
            {#if viewLog.requestBodyType}
                <details open>
                    <summary>Request body</summary>
                    <code bind:this={requestBody}></code>
                </details>
            {/if}

            {#if viewLog.responseBodyType}
                <details open>
                    <summary>Response body</summary>
                    <code bind:this={responseBody}></code>
                </details>
            {/if}

            <details>
                <summary>Request headers</summary>
                <table class="table">
                    {#each Object.entries(viewLog.requestHeaders) as [k,v]}
                        <tr>
                            <td>{k}:</td>
                            <td>{v}</td>
                        </tr>
                    {/each}
                </table>
            </details>

            <details>
                <summary>Response headers</summary>

                <table class="table">
                    {#each Object.entries(viewLog.requestHeaders) as [k,v]}
                        <tr>
                            <td>{k}:</td>
                            <td>{v}</td>
                        </tr>
                    {/each}
                </table>
            </details>
        {/if}
    </div>
</main>

<style>
    main {
        flex-grow: 1;
        width: 100%;
        height: 100%;
        display: flex;
		position: relative;
        font-family: monospace;
        font-size: 13px;
        box-sizing: content-box;

        --status-1: #03989E;
        --status-2: #4eb97c;
        --status-3: #FFD230;
        --status-4: #DA6220;
        --status-5: #fa4c57;

        --key: #A8C7FA;
        --value: #c2c2c2;
        --property: #cf8f74;
    }

	.clear-button {
		position: absolute;
		top: 4px;
		right: 12px;
		font-size: 24px;
		z-index: 10;
	}

    .status-dot {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
        flex-direction: row;
        height: 1em;
    }
    .status-dot::before {
        content: "";
        background-color: var(--status-color);
        width: 0.6em;
        height: 0.6em;
        border-radius: 100em;
    }

    .log-title {
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-size: 1.2em;
        padding: 8px;
    }

    .logs {
        height: 100%;
        width: max-content;
        border-right: 1px solid #fff1;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        min-width: 140px;
    }

    .log {
        padding: 8px;
        padding-left: 11px;
        border: none;
        background-color: transparent;
        color: rgb(180, 180, 180);
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 12px;
        font-family: monospace;
        cursor: pointer;
    }

    .log:hover {
        background-color: #fff1;
    }
    .log.active {
        padding-left: 8px;
        border-left: 3px solid rgb(36, 89, 173);
        background-color: #ffffff04;
    }

    .log-viewer {
        flex-grow: 1;
        overflow-y: auto;
    }

    details {
        padding-bottom: 2px;
    }
    summary {
        font-size: 1em;
        padding: 8px;
        width: 100%;
        background-color: #ffffff08;
        color: #fffc;
        cursor: pointer;
    }
    summary::marker {
        color: #fff3;
        font-size: 0.8em;
    }

    .table {
        text-align: left;
        border-collapse: collapse; 
        margin: 0 8px;
    }
    .table td:first-child {
        white-space: nowrap;
        vertical-align: top;
        padding-right: 16px;
        color: var(--key);
    }
    .table td {
        padding: 8px 0;
        line-break: anywhere;
        color: var(--value);
    }
    .table tr:not(:last-child) {
        border-bottom: 1px solid #fff1;
    }

    code {
        background-color: transparent;
    }
</style>