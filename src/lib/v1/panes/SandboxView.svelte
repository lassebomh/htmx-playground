<script lang="ts">
    import { Sandbox } from "../sandbox";

    export let sandbox: Sandbox
    export let serverUrl: URL;

    export let push_logs: CallableFunction;
    export let group_logs: CallableFunction;
    export let ungroup_logs: CallableFunction;
    export let increment_duplicate_log: CallableFunction;
    export let clear_logs: CallableFunction;
    export let push_dom_diff: (html: any) => void;
    export let push_network_log: CallableFunction;

    let iframe: HTMLIFrameElement;
    let currentLocation: string;
    
    export function reloadSandbox(){
        iframe.contentWindow!.postMessage({type: 'reload'}, serverUrl.origin)
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
    function on_init(event: MessageEvent<any>) {
        event.source!.postMessage({
            type: 'init',
            value: sandbox.exportFiles()['/_server.html'],
        }, {targetOrigin: event.origin})
    }

    function on_fetch_files(event: MessageEvent<any>) {
        event.source!.postMessage({
                type: 'fetch-files',
                value: sandbox.exportFiles(),
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

</script>

<main>
    <div class="topbar">
        <!-- <button on:click={_ => reloadSandbox()} class='reload icon-button' title="Reload playground (CTRL+S)">
            <i class='codicon codicon-arrow-left'></i>
        </button>
        <button on:click={_ => reloadSandbox()} class='reload icon-button' title="Reload playground (CTRL+S)">
            <i class='codicon codicon-arrow-right'></i>
        </button> -->
        <button on:click={_ => reloadSandbox()} class='reload icon-button' title="Reload playground (CTRL+S)">
            <i class='codicon codicon-debug-restart'></i>
        </button>
        <div class="url">
            {currentLocation}
        </div>
    </div>
    <iframe title={sandbox.title} bind:this={iframe} src={serverUrl.href} frameborder="0"></iframe>
</main>

<style>
    main {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    iframe {
        width: 100%;
        flex-grow: 1;
    }

    .topbar {
        background-color: #252526;
        height: 38px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
        gap: 4px;
        padding: 0 4px;
    }

    .url {
        flex-grow: 1;
        background-color: #1E1E1E;
        color: #fff6;
        border-radius: 50em;
        height: 28px;
        font-size: 14px;
        padding-left: 14px;
        display: flex;
        align-items: center;
    }

    .reload {
        height: 28px;
        width: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50em;
    }
</style>