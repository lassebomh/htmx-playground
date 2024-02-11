<script lang="ts">
    import './style.css'
    import '@vscode/codicons/dist/codicon.css'
    
	import { Pane, Splitpanes } from 'svelte-splitpanes';
    
    import { Sandbox } from "./sandbox";
    import type { Log } from "./tabs/console/console";

    import SandboxView from "./panes/SandboxView.svelte";
    import DOMDiff from './tabs/DOMDiff.svelte'
    import Console from "./tabs/console/Console.svelte";
    import NetworkViewer from './tabs/NetworkViewer.svelte';
    import Editor from './editor/Editor.svelte'
    import { get } from 'svelte/store';
    
    export let sandbox: Sandbox

    let serverUrl = new URL('http://sandbox.localhost:4321/_init.html')
    let mobile = window.innerWidth < 800;
    let sandboxView: SandboxView;


	let logs: Log[] = [];
	function pushLogs(log: Log) {
		logs = [...logs, log];
	}
	function clearLogs() {
		logs = [];
	}

    let networkLogs: any[] = []

    async function pushNetworkLog(request: any, response: any) {
        networkLogs = [
            {
                url: new URL(request.url),
                method: request.method,
                requestHeaders: request.headers,
                requestBody: request.body ? await request.body.text() : null,
                requestBodyType: request.body ? request.body.type : null,
                status: response.status,
                statusN: Math.floor(response.status/100),
                responseHeaders: response.headers,
                responseBody: response.body ? await response.body.text() : null,
                responseBodyType: response.body ? response.body.type : null,
            },
            ...networkLogs
        ]
    }

    function onSandboxReload() {
        sandbox.updateReadme()
    }

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            if (sandboxView) sandboxView.reloadSandbox() // this is async
        }
    });

    let readmeHTML = sandbox.readmeHTML

    let tabs = [
        'README',
        "DOM Diff",
        'Console',
        'Network',
    ]
    let activeTab = $readmeHTML ? "README" : 'DOM Diff'


    $: {
        readmeHTML = sandbox.readmeHTML
        if (!readmeHTML && activeTab == 'README') {
            activeTab = 'Console';
        }
    }

    let domDiff: DOMDiff
    let domDiffHistory: string[] = [];

    function pushDomDiff(html: any) {
        domDiffHistory = [...domDiffHistory.slice(domDiffHistory.length - 1), html]
    }

    let debuggerPaneSize = 0;
    let debuggerTabs: HTMLButtonElement;

    function toggleDebuggerPane(event: any) {
        if (event != undefined && event.target != debuggerTabs) return;
        if (debuggerPaneSize > 10) {
            debuggerPaneSize = 0
        } else {
            debuggerPaneSize = 50
        }
    }

    let sandboxPaneSize: number | undefined;

    $: if (mobile) {
        if (showView != 'show-sandbox') {
            sandboxPaneSize = 0;
        } else {
            sandboxPaneSize = 100;
        }   
    }

    let showView: 'show-editor' | 'show-sandbox' | 'show-all' = mobile ? 'show-sandbox' : 'show-all'
    let hideFileTree = get(sandbox.openNodes).length > 0;

</script>

<main class:mobile={mobile}>
    <Splitpanes class="main-split-pane">
        {#if !mobile || showView != 'show-sandbox'}
            <Pane class="editor-pane">
                <Editor
                    {mobile}
                    bind:hideFileTree={hideFileTree}
                    title={sandbox.title}
                    nodes={sandbox.nodes}
                    nodeIndexer={sandbox.nodeIndexer}
                    openNodes={sandbox.openNodes}
                    viewNode={sandbox.viewNode}
                    nodeContents={sandbox.nodeContents}
                />
            </Pane>
        {/if}
        <Pane class="sandbox-pane" bind:size={sandboxPaneSize}>
            <Splitpanes horizontal={true} class="sandbox-split-pane">
                <Pane>
                    <SandboxView
                        bind:this={sandboxView}
                        bind:sandbox={sandbox}
                        {serverUrl}
                        {onSandboxReload}
                        {pushNetworkLog}
                        {pushDomDiff}
                        {pushLogs}
                        {clearLogs}
                    />
                </Pane>
                <Pane class="debugger-pane" bind:size={debuggerPaneSize}>
                    <button class='tabs' bind:this={debuggerTabs} on:click={toggleDebuggerPane}>
                        {#each tabs as tab}
                            {#if tab != 'README' || $readmeHTML}
                                <button on:click={_ => {activeTab = tab; if (debuggerPaneSize < 10) debuggerPaneSize = 50} } class='tab' class:active={activeTab == tab}>
                                    {tab}
                                </button>
                            {/if}
                        {/each}
                    </button>
                    {#if activeTab == 'Console'}
                        <Console logs={logs} {clearLogs} />
                    {:else if activeTab == 'DOM Diff'}
                        <DOMDiff bind:this={domDiff} bind:domDiffHistory={domDiffHistory} />
                    {:else if activeTab == 'README'}
                        {#if $readmeHTML}
                            {@const title = sandbox.title}
                            <article>
                                {@html $readmeHTML}
                            </article>
                        {/if}
                    {:else if activeTab == 'Network'}
                        <NetworkViewer logs={networkLogs} {mobile} />
                    {/if}
                </Pane>
            </Splitpanes>
        </Pane>
    </Splitpanes>
    {#if mobile}
        <div class="view-switch">
            <div class="view-switch-buttons">
                <button class:active={showView == 'show-editor' && !hideFileTree} on:click={_ => {showView='show-editor'; hideFileTree=false;}}>
                    Files
                </button>
                <button class:active={showView == 'show-editor' && hideFileTree} on:click={_ => {showView='show-editor'; hideFileTree=true;}}>
                    Editor
                </button>
                <button class:active={showView == 'show-sandbox'} on:click={_ => showView = 'show-sandbox'}>
                    Output
                </button>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .view-switch {
        position: fixed;
        bottom: 12vh;
        right: 6px;
        /* width: 100%; */
        display: flex;
        justify-content: center;
        z-index: 1000;
    }

    .view-switch-buttons {
        display: flex;
        flex-direction: column;
        border-radius: 4px;
        background-color: #202020;
        border: 2px solid #fff3;
    }

    .view-switch-buttons button {
        font-size: 16px;
        padding: 8px 18px;
        background-color: transparent;
        border: none;
        color: white;
    }

    .view-switch-buttons button:first-child {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
    .view-switch-buttons button:last-child {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    .view-switch-buttons button.active {
        background-color: #ffffff15;
    }

    main.mobile :global(.splitpanes__splitter) {
        display: none;
    }

    :global(.debugger-pane) {
        min-height: 33px !important;
        border-left: 1px solid #fff1 !important;
    }
    :global(.sandbox-split-pane > .splitpanes__splitter) {
        border-top: 1px solid #fff1 !important;
    }

    :global(.editor-split-pane > .splitpanes__splitter) {
        background-color: #1e1e1e !important;
    }

    .tabs {
        background-color: transparent;
        border: none;
        display: flex;
        cursor: pointer;
        background-color: #ffffff08;
        padding: 0;
        box-shadow: 4px 4px 8px #0002;
    }

    .tab {
        background: none;
        border: none;
        padding: 8px;
        border-bottom: 2px solid transparent;
        color: rgb(146, 146, 146);
        cursor: pointer;
    }
    .tab:hover {
        background-color: #fff1;
    }
    .tab:not(.active):hover {
        color: rgb(204, 204, 204);
    }
    .tab.active {
        border-bottom-color: #7CACF8;
        color: #A8C7FA;
    }
</style>