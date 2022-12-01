<script>
    import { writable } from 'svelte/store'
    import { onMount } from 'svelte';

    import defaultLoader from './assets/sandbox/head.html?raw'
    import defaultServer from './assets/sandbox/server.js?raw'
    import defaultIndex from './assets/sandbox/index.html?raw'
    
    import './assets/app.css'
    import Ace from './components/Ace.svelte'

    let sandbox;
    let srcdoc;

    let activeFileIndex = writable(null);
    let files = writable(null);
    let file = writable(null);
    
    $: if ($files != null && $activeFileIndex != null) {
        $file = $files[$activeFileIndex];
    }

    function getPlaygroundIdentifier() {
        const hashSplit = window.location.hash.substring(1).split(':')
        if (hashSplit.length != 2) throw new Error("No playground id")

        return {schema: hashSplit[0], id: atob(hashSplit[1])}
    }
    function setPlaygroundIdentifier(schema, id) {
        window.location.hash = "#" + schema + ":" + btoa(id)
    }

    function save() {
        let schema;
        let id;

        try {
            let pid = getPlaygroundIdentifier()
            schema = pid.schema
            id = pid.id
            
        } catch (error) {
            schema = 'local'
            id = crypto.randomUUID().replaceAll('-', '')
            setPlaygroundIdentifier(schema, id)
        }

        switch (schema) {
            case "local":
                localStorage.setItem(id, JSON.stringify($files))
                break;
        
            default:
                throw new Error("Unknown save schema")
                break;
        }
    }
    function load() {
        const { schema, id } = getPlaygroundIdentifier()
         
        switch (schema) {
            case "local":
                $files = JSON.parse(localStorage.getItem(id))
                break;
        
            default:
                throw new Error("Unknown load schema")
                break;
        }

        if ($files == null) throw new Error("Failed to load playground")

        $activeFileIndex = $files.findIndex((file) => file.filename == "server.js");
    }

    // function initSandbox() {
    //     sandbox.contentWindow.postMessage({'type': "initialize_sandbox", 'files': $files}, '*')
    // }

    function updateSrcdoc() {
        sandbox.srcdoc = ""

        let setup = $files.find((file) => file.filename == '.loader.html').contents
        let index = $files.find((file) => file.filename == 'index.html').contents
        // @ts-ignore
        sandbox.srcdoc = nunjucks.renderString(index, { loader: setup });

        setTimeout(() => {
            sandbox.contentWindow.postMessage({'type': "initialize_sandbox", 'files': $files}, '*')
        }, 1000)
    }

    onMount(async () => {
        try {
            load()
        } catch (error) {

            $activeFileIndex = 0

            $files = [
                {
                    filename: "server.js",
                    contents: defaultServer
                },
                {
                    filename: "index.html",
                    contents: defaultIndex
                },
                {
                    filename: ".loader.html",
                    contents: defaultLoader
                },
            ]
        }

        updateSrcdoc()
    })
</script>

<div class="editor-topbar">
    <div class="tabs">
        {#if $files}
            {#each $files as file, i}
                <button on:click={_ => $activeFileIndex = i} class="tab" class:active={i == $activeFileIndex}>
                    {file.filename}
                </button>
            {/each}
        {/if}
    </div>
    <div class="util-buttons">
        <button on:click={updateSrcdoc} class="reload-button">
            Reload
        </button>
        <button on:click={save} class="save-button">
            Save
        </button>
    </div>
</div>
<main>
    <div class="editor-container">
        {#if $files}
            <Ace {file} />
        {/if}
    </div>
    <iframe bind:this={sandbox} title="Sandbox" frameborder="0" sandbox="allow-scripts"></iframe> 
</main>

<style>
    main {
        display: flex;
        height: inherit;
    }

    .editor-container {
        width: 50%;
        height: inherit;
        background-color: #222222;
    }

    .editor-topbar {
        padding-left: 42px;
        background-color: #1c1c1c;
        /* width: 100%; */
        display: flex;
        justify-content: space-between;
    }

    .util-buttons {
        /* height: inherit; */
        display: flex;
        gap: 3px;
        padding: 3px 3px;
    }

    .tabs {
        padding: 0px 0px;
        display: flex;
        align-items: center;
        justify-content: start;
        /* gap: 2px; */
    }

    .tab {
        font-size: 1em;
        font-family: monospace;
        padding: 6px 8px;
        color: #8b888f;
        background-color: transparent;
        height: 100%;
        border: none;
        border-bottom: 1px solid transparent;
    }

    .tab.active {
        color: #fce550;
        border-bottom-color: #fce550;
    }

    iframe {
        height: inherit;
        width: 50%;
    }
</style>