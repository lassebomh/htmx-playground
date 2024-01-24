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
    
    let serverUrl = new URL('http://sandbox.localhost:4321/_init.html')
    
    export let sandbox: Sandbox

    let fileEditor: Monaco;
    let fileTree: Wunderbaum;
    let sandboxView: SandboxView;

	let logs: Log[] = [];
    let last_console_event: Log;
	let log_group_stack: Log[][] = [];
	let current_log_group = logs;

	// function show_error(e) {
	// 	const map = $bundle?.dom?.map;
	// 	if (!map) return;

	// 	// @ts-ignore INVESTIGATE
	// 	const loc = getLocationFromStack(e.stack, map);
	// 	if (loc) {
	// 		e.filename = loc.source;
	// 		e.loc = { line: loc.line, column: loc.column ?? 0 };
	// 	}

	// 	error = e;
	// }

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


    function onProjectRename(oldValue: string, newValue: string) {
        console.log('projectrename', oldValue, newValue);
        sandbox.title = newValue
        sandbox = sandbox
    }

    function onFileContentUpdate(path: string, content: string) {
        sandbox.files![path] = content;
    }

    function onPathUpdate(diffMap: {[path: string]: string}) {
        console.log('update', diffMap);
        for (const [oldPath, newPath] of Object.entries(diffMap)) {
            fileEditor.updateTab(oldPath, newPath, getFilenameLanguage(newPath))
            sandbox.files![newPath] = sandbox.files![oldPath]
            delete sandbox.files![oldPath]
        }
    }

    function onFileActive(path: string) {
        // console.log('active', path);
        fileEditor.createTab(path, sandbox.files![path], getFilenameLanguage(path))
        fileEditor.setOpenTab(path)
    }

    function onFileDelete(path: string) {
        // console.log('delete', path);
        fileEditor.closeTab(path)
        delete sandbox.files![path]
    }

    function onFileCreate(parentPath: string) {
        let [title, type, content] = ['partial.html', 'html', '<div><\/div>'];
        let path = `${parentPath}/${title}`;
            
        sandbox.files![path] = content

        fileEditor.createTab(path, content, type)
        fileEditor.setOpenTab(path)

        return [title, type]
    }

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            sandboxView.reloadSandbox()
        }
    });

    let tabs = [
        'Sandbox',
        'Console',
        "DOM Diff"
    ]

    let fileTreeHidden = false;
    let activeTab = 'Sandbox'
    let domDiff: DOMDiff

    let debuggerPaneSize = 50;
    let debuggerTabs: HTMLButtonElement;

    let domDiffHistory: string[] = [];

    function push_dom_diff(html: any) {
        domDiffHistory = [...domDiffHistory.slice(domDiffHistory.length - 1), html]
    }

    function toggleDebuggerPane(event: any) {
        if (event.target != debuggerTabs) return;
        if (debuggerPaneSize > 10) {
            debuggerPaneSize = 0
        } else {
            debuggerPaneSize = 50
        }
    }
</script>

<main>
    <Splitpanes>
        <Pane>
            <Splitpanes horizontal={true}>
                <Pane>
                    <div class="editor">
                        {#if !fileTreeHidden}
                            <div class="filetree">
                                <Wunderbaum bind:this={fileTree} bind:fileTreeHidden={fileTreeHidden} initPaths={Object.keys(sandbox.files)} rootName={sandbox.title} {onPathUpdate} {onFileActive} {onFileDelete} {onFileCreate} {onProjectRename} />
                            </div>
                        {/if}
                        <div class="fileeditor">
                            <Monaco bind:this={fileEditor} bind:fileTreeHidden={fileTreeHidden} {onFileContentUpdate} />
                        </div>
                    </div>
                </Pane>
            </Splitpanes>
        </Pane>

        <Pane>
            <Splitpanes horizontal={true}>
                <Pane>
                    <SandboxView
                        bind:this={sandboxView}
                        {serverUrl}
                        {sandbox}
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
                            <button on:click={_ => activeTab = tab} class='tab' class:active={activeTab == tab}>{tab}</button>
                        {/each}
                    </button>
                    {#if activeTab == 'Console'}
                        <Console {logs} on:clear={clear_logs} />
                    {:else if activeTab == 'DOM Diff'}
                        <DOMDiff bind:this={domDiff} bind:domDiffHistory={domDiffHistory} />
                    {:else if activeTab == 'Sandbox'}
                        <About {sandbox} />
                    {/if}
                </Pane>
            </Splitpanes>
        </Pane>
    </Splitpanes>
</main>

<style>
    main {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    :global(.debugger-pane) {
        min-height: 35px !important;
    }
    .tabs {
        background-color: transparent;
        border: none;
        display: flex;
        cursor: pointer;
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

    .editor {
        display: flex;
        height: 100%;
        width: 100%;
    }
    .filetree {
        flex-shrink: 0;
        flex-grow: 0;
        min-width: 240px;
    }
    .fileeditor {
        flex-grow: 1;
    }
</style>