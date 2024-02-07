<script lang="ts">
    import { get } from "svelte/store";
    import { setWindowLocation, type SandboxLocation } from "../../location";
    import { Sandbox, getHandler } from "../sandbox";
    import { directoryContainsHandler, getDirectory } from "../directory";

    export let sandbox: Sandbox
    export let serverUrl: URL;

    export let push_logs: CallableFunction;
    export let group_logs: CallableFunction;
    export let ungroup_logs: CallableFunction;
    export let increment_duplicate_log: CallableFunction;
    export let clear_logs: CallableFunction;
    export let push_dom_diff: (html: any) => void;
    export let push_network_log: CallableFunction;
    export let onSandboxReload: CallableFunction;

    let iframe: HTMLIFrameElement;
    let currentLocation: string;
    

    export async function reloadSandbox(){
        iframe.contentWindow!.postMessage({
            type: 'reload',
            value: await sandbox.exportFiles(),
        }, serverUrl.origin)
        onSandboxReload()
        // // console.log(await sandbox.exportFiles());
        // iframe.contentWindow?.document.location.reload()
        
    }

    // function on_fetch_progress(progress) {
    //     pending_imports = progress;
    // }
    function on_error(event: any) {
        push_logs({ level: 'error', args: [event.value] });
    }
    function on_unhandled_rejection(event: any) {
        let error = event.value;
        if (typeof error === 'string') error = { message: error };
        error.message = 'Uncaught (in promise): ' + error.message;
        push_logs({ level: 'error', args: [error] });
    }
    function on_console(log: any) {
        if (log.level === 'clear') {
            clear_logs();
            push_logs(log);
        } else if (log.duplicate) {
            increment_duplicate_log();
        } else {
            push_logs(log);
        }
    }
    function on_console_group(action: any) {
        group_logs(action.label, false);
    }
    function on_console_group_end() {
        ungroup_logs();
    }
    function on_console_group_collapsed(action: any) {
        group_logs(action.label, true);
    }
    async function on_init(event: MessageEvent<any>) {
        event.source!.postMessage({
            type: 'init',
            value: (await sandbox.exportFiles())['/_server.html'],
        }, {targetOrigin: event.origin})
    }

    async function on_fetch_files(event: MessageEvent<any>) {
        event.source!.postMessage({
                type: 'fetch-files',
                value: await sandbox.exportFiles(),
        }, {targetOrigin: event.origin})
    }

    function on_location_update(event: MessageEvent<any>) {
        currentLocation = event.data.value;
    }

    window.addEventListener('message', (event) => {
        if (event.origin !== serverUrl.origin || event.source == null) return

		switch (event.data.type) {
			case 'init':
                return on_init(event)
			case 'fetch-files':
                return on_fetch_files(event)
			case 'location':
                return on_location_update(event)
            case 'domdiff':
                return push_dom_diff(event.data.value)
            case 'network':
                return push_network_log(event.data.request, event.data.response)
			// case 'cmd_error':
			// case 'cmd_ok':
			// 	return handle_command_message(event.data);
			// case 'fetch_progress':
			// 	return on_fetch_progress(args.remaining);
			case 'error':
				return on_error(event.data);
			case 'unhandledrejection':
				return on_unhandled_rejection(event.data);
			case 'console':
				return on_console(event.data);
			case 'console_group':
				return on_console_group(event.data);
			case 'console_group_collapsed':
				return on_console_group_collapsed(event.data);
			case 'console_group_end':
				return on_console_group_end();
		}
    })

    async function handleLoad(location: SandboxLocation) {
        sandbox.viewNode.set(null)
        sandbox.openNodes.set([])

        let handler = getHandler(location)
        let config = await handler.getConfig()
        let newSandbox: Sandbox = await handler.getSandbox(config)

        sandbox = newSandbox;

        setWindowLocation(sandbox.handler.getLocation(sandbox.getTitle()))
        
        await reloadSandbox()

        popupView = null
    }

    async function handleDelete(location: SandboxLocation) {
        let handler = getHandler(location)
        if (handler.savable && !confirm("Are you sure you want to delete this sandbox?")) {
            return
        }
        await handler.delete()
        directory = getDirectory()
    }

    async function handleSave(local: boolean) {

        if (local) {
            sandbox.handler = getHandler({
                method: "local",
                version: "v1",
                params: {},
                title: sandbox.getTitle(),
            })
        }

        await sandbox.save()
        directory = getDirectory()
    }

    let popupView: 'examples' | 'sandbox' | null = null

    function handleButtonClick(viewName: any) {
        if (popupView == viewName) {
            popupView = null
        } else {
            popupView = viewName
        }
    }


    let directory = getDirectory()

</script>

<main>
    <div class="topbar">
        <div style="flex-grow: 1;">
            <button on:click={_ => reloadSandbox()} class='reload icon-button' title="Reload playground (CTRL+S)">
                <i class='codicon codicon-debug-restart'></i>
            </button>
            <div class="url">
                {currentLocation || "Loading..."}
            </div>
        </div>
        <div>
            <div class="button-group">
                <button class='button' class:active={popupView == 'examples'} on:click={_ => {handleButtonClick('examples')}}>
                    Find examples
                </button>
                <button class='button' class:active={popupView == 'sandbox'} on:click={_ => {handleButtonClick('sandbox')}}>
                    Sandbox
                </button>
            </div>
        </div>
    </div>
    <iframe title="" bind:this={iframe} src={serverUrl.href} frameborder="0"></iframe>
    {#if popupView}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="popup"> <!-- on:mouseleave={_ => popupView = null} -->
            {#if popupView == 'examples'}
                <table class="sandbox-loader">
                    <tbody>
                        {#each directory as location}
                            <tr>
                                <td>
                                    <span>{location.method}</span>
                                    {location.title}
                                </td>
                                <td class="button-group">
                                    <button class="button" on:click={() => handleLoad(location)}>
                                        Load
                                    </button>
                                    <button class="button" on:click={() => handleDelete(location)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {:else if popupView == 'sandbox'}
                <div class="button-group" style="widtha: 100%;">
                    <button
                        style="flex-grow: 1;"
                        class="button"
                        on:click={_ => handleSave(false)}
                        disabled={!sandbox.handler.savable}>
                        Save
                    </button>
                    <button
                        style="flex-grow: 1;"
                        on:click={_ => handleSave(true)}
                        class="button">
                        Clone
                    </button>
                    <button
                        style="flex-grow: 1;"
                        class="button"
                        on:click={_ => handleSave(false)}
                        disabled={sandbox.handler.savable || directoryContainsHandler(sandbox.handler)}>
                        Save reference
                    </button>
                </div>
                {#if directory.length}
                    <h4>Load sandbox</h4>
                    <table class="sandbox-loader">
                        <tbody>
                            {#each directory as location}
                                <tr>
                                    <td>
                                        <span>{location.method == 'local' ? 'local' : 'remote'}</span>
                                        {location.title}
                                    </td>
                                    <td class="button-group button-group-borderless">
                                        <button class="button" on:click={() => handleLoad(location)}>
                                            Load
                                        </button>
                                        <button class="button" on:click={() => handleDelete(location)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {/if}
                <h4>Sharing</h4>
                <ol>
                    <li>
                        <a href="#">Download the sandbox JSON.</a>
                    </li>
                    <li>
                        Upload it as a public Github Gist (<a href="https://gist.github.com/" target="_blank">new tab</a>)
                    </li>
                    <li>
                        Copy the Gist URL
                    </li>
                    <li>
                        Paste it <a href="#">in here</a>.
                    </li>
                </ol>
            {/if}
        </div>
    {/if}
</main>

<style>
    main {
        container-type: inline-size;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    iframe {
        width: 100%;
        flex-grow: 1;
    }

    .sandbox-loader {
        width: 100%;
        color: #fff;
    }

    .sandbox-loader span {
        color: #777;
        font-family: monospace;
        font-size: 0.9em;
    }

    .sandbox-loader .button-group {
        justify-content: end;
        align-items: center;
    }

    .popup {
        position: absolute;
        right: 0;
        top: 38px;
        padding: 6px 18px;
        background-color: #252526;
        width: max-content;
        border: 1px solid #fff1;
        border-bottom-left-radius: 6px;
        border-top: none;
        border-right: none;
    }

    .popup h4 {
        margin: 0.8em 0;
        color: #aaa;
        font-weight: 500;
    }

    .topbar {
        position: relative;
        justify-content: center;
        padding: 0 6px;
    }

    @container (max-width: 500px) {
        .topbar {
            flex-direction: column;
            height: 76px !important;
            gap: 6px;
        }
        .topbar > div {
            width: 100%;
            flex-grow: 0 !important;
        }
        .popup {
            position: absolute;
            right: 0;
            left: 0;
            width: auto;
            padding: 6px 6px;
            padding-top: 0;
            top: 76px;
            border-bottom-left-radius: 0;
            border-left: none;
        }
    }

    .topbar > div {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        gap: 4px;
    }

    .url {
        height: 28px;
        flex-grow: 1;
        background-color: #1E1E1E;
        color: #fff6;
        font-size: 14px;
        padding-left: 14px;
        display: flex;
        align-items: center;
        border-radius: 50em;
        flex-shrink: 1;
    }

    .reload {
        height: 28px;
        width: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50em;
    }

    .button {
        height: 28px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: 1px solid #444;
        color: #bbb;
        line-height: 1;
        gap: 0.5em;
        border-radius: 50em;
        cursor: pointer;
    }

    .button:disabled {
        pointer-events: none;
        color: #555;
        border-color: #444;
    }

    .button:not(.active):hover {
        background-color: #fff1;
        border: 1px solid #666;
        z-index: 10;
        color: #fff;
    }

    .button.active {
        background-color: #04395e;
        border: 1px solid #007fd4;
        z-index: 10;
        color: #fff;
    }

    .button-group {
        height: 28px;
        display: flex;
    }

    .button-group .button:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .button-group .button:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .button-group .button:last-child {
        padding-right: 14px;
    }
    .button-group .button:last-child:not(:nth-child(2)) {
        margin-left: -1px;
    }
    .button-group .button:first-child {
        padding-left: 14px;
        margin-right: -1px;
    }

    .button-group.button-group-borderless .button {
        border: none;
        border-radius: 0;
        padding: 0 10px;
        gap: 0;
    }

    .button-group.button-group-borderless .button:not(:first-child) {
        padding-left: 0;
        padding-right: 10px;
    }
    .button-group.button-group-borderless .button:not(:first-child)::before {
        content: "";
        display: list-item;
        border-left: 1px solid #444;
        padding-right: 10px;
        height: 60%;
        list-style: none;
    }

    .button-group.button-group-borderless .button:hover::before, .button-group.button-group-borderless .button:hover + .button::before {
        border-color: transparent;
    }

</style>