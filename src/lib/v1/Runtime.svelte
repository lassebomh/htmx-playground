<script lang="ts">
    // http://localhost:5173/?key=88b9749d-0157-4716-a3f8-6ba7a9e613f4&version=v1&method=local

    import './style.css'
    
    import { onMount } from "svelte";
	import { Pane, Splitpanes } from 'svelte-splitpanes';
    
    import { getFilenameLanguage } from "./files";
    import { Sandbox } from "./sandbox";

    import Monaco from "./panes/Monaco.svelte";
    import Wunderbaum from "./panes/Wunderbaum.svelte";
    import SandboxView from "./panes/SandboxView.svelte";
    
    import About from './tabs/About.svelte';
    import DOMDiff from './tabs/DOMDiff.svelte'
    import Console from "./tabs/console/Console.svelte";
    import type { Log } from "./tabs/console/console";
    import DOMPurify from 'dompurify';
    import { marked } from 'marked';
    import NetworkViewer from './tabs/NetworkViewer.svelte';
    import ConsoleLine from './tabs/console/ConsoleLine.svelte';
    
    import Editor from './editor/index.js'
    import sample from './editor/tree_data.json'
    import { writable } from "svelte/store";

    let serverUrl = new URL('http://sandbox.localhost:4321/_init.html')
    
    export let sandbox: Sandbox

    let mobile = window.innerWidth < 800;

    let fileEditor: Monaco;
    let fileTree: Wunderbaum;
    let sandboxView: SandboxView;

    let readmeHtml: string | null = null;

	let logs: Log[] = [];
    let last_console_event: Log;
	let log_group_stack: Log[][] = [];
	let current_log_group = logs;

	function push_logs(log: Log) {
		current_log_group.push((last_console_event = log));
		logs = logs;
	}

	function group_logs(label: string, collapsed: boolean) {
		const group_log: Log = { level: 'group', label, collapsed, logs: [] };
		current_log_group.push({ level: 'group', label, collapsed, logs: [] });
		// TODO: Investigate
		log_group_stack.push(current_log_group);
		current_log_group = group_log.logs ?? [];
		logs = logs;
	}

	function ungroup_logs() {
		const last = log_group_stack.pop();
		if (last) current_log_group = last;
	}

	function increment_duplicate_log() {
		const last_log = current_log_group[current_log_group.length - 1];

		if (last_log) {
			last_log.count = (last_log.count || 1) + 1;
			logs = logs;
		} else {
			last_console_event.count = 1;
			push_logs(last_console_event);
		}
	}

	function clear_logs() {
		current_log_group = logs = [];
	}


    let networkLogs: any[] = []

    async function push_network_log(request: any, response: any) {
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

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            sandboxView.reloadSandbox() // this is async
        }
    });

    let tabs = [
        'Sandbox',
        'Console',
        'Network',
        "DOM Diff"
    ]

    let activeTab = localStorage.getItem('active_tab') || "Sandbox"

    $: {
        localStorage.setItem('active_tab', activeTab)
    }

    let domDiff: DOMDiff
    let domDiffHistory: string[] = [];

    function push_dom_diff(html: any) {
        domDiffHistory = [...domDiffHistory.slice(domDiffHistory.length - 1), html]
    }

    let debuggerPaneSize = 50;
    let debuggerTabs: HTMLButtonElement;

    function toggleDebuggerPane(event: any) {
        if (event != undefined && event.target != debuggerTabs) return;
        if (debuggerPaneSize > 10) {
            debuggerPaneSize = 0
        } else {
            debuggerPaneSize = 50
        }
    }

    let fileTreePaneSize = mobile ? 0 : (215 / window.innerWidth * 2) * 100;
    let fileTreePaneSizeMin = (150 / window.innerWidth * 2) * 100;

    let showView: 'show-editor' | 'show-sandbox' | 'show-all' = mobile ? 'show-sandbox' : 'show-all'
</script>

<main class="{showView}" class:mobile={mobile}>
    <Splitpanes class="main-split-pane">
        <Pane class="editor-pane">
            <Editor nodes={sandbox.nodes} openNodes={sandbox.openNodes} viewNode={sandbox.viewNode} nodeContents={sandbox.nodeContents} />
        </Pane>

        <Pane class="sandbox-pane">
            <Splitpanes horizontal={true} class="sandbox-split-pane">
                <Pane>
                    <SandboxView
                        bind:this={sandboxView}
                        {serverUrl}
                        {sandbox}
                        {push_network_log}
                        {push_dom_diff}
                        {push_logs}
                        {group_logs}
                        {ungroup_logs}
                        {increment_duplicate_log}
                        {clear_logs} />
                </Pane>
                <Pane class="debugger-pane" bind:size={debuggerPaneSize}>
                    <button class='tabs' bind:this={debuggerTabs} on:click={toggleDebuggerPane}>
                        {#each tabs as tab}
                            <button on:click={_ => {activeTab = tab; if (debuggerPaneSize < 10) debuggerPaneSize = 50} } class='tab' class:active={activeTab == tab}>
                                {tab}
                            </button>
                        {/each}
                    </button>
                    {#if activeTab == 'Console'}
                        <Console logs={logs} {clear_logs} />
                    {:else if activeTab == 'DOM Diff'}
                        <DOMDiff bind:this={domDiff} bind:domDiffHistory={domDiffHistory} />
                    {:else if activeTab == 'Sandbox'}
                        <About title="" readmeHtml={readmeHtml} />
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
                <button class:active={showView == 'show-editor'} on:click={_ => showView = 'show-editor'}>
                    Input
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
        bottom: 40px;
        width: 100%;
        display: flex;
        justify-content: center;
        z-index: 1000;
    }

    .view-switch-buttons {
        display: flex;
        /* gap: 8px; */
    }

    .view-switch-buttons button {
        font-size: 20px;
        background-color: #202020;
        padding: 8px 18px;
        border: none;
        color: white;
        border-radius: 10px;
    }

    .view-switch-buttons button.active {
        background-color: #303030;
    }

    .view-switch-buttons button:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .view-switch-buttons button:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    main.mobile :global(.splitpanes__splitter) {
        display: none;
    }

    main:not(.show-all) :global(.main-split-pane > .splitpanes__splitter) {
        width: 0 !important;
    }
    main:not(.show-all) :global(.main-split-pane > .splitpanes__splitter::before) {
        width: 0 !important;
    }

    main.show-editor :global(.sandbox-pane) {
        width: 0 !important;
    }
    main.show-editor :global(.editor-pane) {
        width: 100% !important;
    }

    main.show-sandbox :global(.editor-pane) {
        width: 0 !important;
    }
    main.show-sandbox :global(.sandbox-pane) {
        width: 100% !important;
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
        background-color: #252526;
        padding: 0;
        box-shadow: 4px 4px 8px #0002;
    }

    .tab {
        background: none;
        border: none;
        padding: 8px;
        border-bottom: 2px solid transparent;
        color: rgb(146, 146, 146);
    }
    .tab.active {
        border-bottom-color: #7CACF8;
        color: #A8C7FA;
    }
</style>