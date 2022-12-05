<script lang="ts">
    import { writable } from 'svelte/store'
    import { onMount } from 'svelte';
    import { propertyStore } from 'svelte-writable-derived';

    import Editor from "./components/layout/Editor.svelte";
    import Sandbox from "./components/layout/Sandbox.svelte";
    import Sidebar from "./components/layout/Sidebar.svelte";

    import { srcdoc, activeFileIndex, openFile, playground } from './playground';

    $: if ($playground != null && $activeFileIndex != null) {
        $openFile = $playground.files[$activeFileIndex]
    }

    let logs = []
    let network = []
    
    async function loadFile(method, location) {
        // hxbox:<playground_id>:<file_id>
        // https://localhost:5500/sandbox/index.html

        switch (method) {
            case "url":
                return await (await fetch(location)).text()
            default:
                throw new Error("Unknown file load method")
        }
    }

    async function loadPlayground(method, location) {
        let pg = JSON.parse(await loadFile(method, location))
        await Promise.all(pg.files.map(async (file) => {
            file.contents = await loadFile(pg.method, file.location)
        }))
        playground.set(pg)
        $activeFileIndex = $playground.files.findIndex((file) => file.filename == "server.js");
    }
    
    document.addEventListener('keypress', (event) => {
        if (event.ctrlKey && event.key === 'z') {
            event.stopPropagation();
            event.preventDefault()
            updateSrcdoc()
        }
    });
    
    function updateSrcdoc() {
        $srcdoc = ""

        let loader = $playground.files.find((file) => file.filename == '.loader.html').contents
        let index = $playground.files.find((file) => file.filename == 'index.html').contents
        let filedata = `<script> const files = ` + JSON.stringify($playground.files).replaceAll('/', '\\/') + `<\/script>\n`;
    
        $srcdoc = filedata + loader + index;
    }

    function fileInit(e) {
        e.focus();
        document.execCommand('selectAll',false,null);
    }

    onMount(async () => {
        await loadPlayground('url', './playgrounds/minimal/.playground.json')
        updateSrcdoc()
    })

    window.addEventListener('message', (message) => {
        console.log(message);
        
        if (message.data && message.data.type) {
            switch (message.data.type) {
                case "console":
                    logs.push(message.data.log)
                    break;
                case "network":
                    network.push(message.data.exchange)
                    break;
            
                default:
                    break;
            }
        }
    })

</script>

{#if $playground}
    
<main>
    <div class="topbar">
        <div class="topbar-left">   
            <input class="name-edit" type="text" bind:value={$playground.name}>
        </div>
        <div class="topbar-right">
            <div>Save</div>
            <div>Share</div>
            <div>Donate</div>
        </div>
    </div>
    <div class="center">
        <Sidebar />
        <div class="windows">
            <Editor />
            <Sandbox />
        </div>
    </div>
</main>

{/if}

<style>
    main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .topbar {
        background-color: #161616;
        height: 40px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .topbar-right {
        display: flex;
        gap: 1em;
        justify-content: space-between;
        align-items: center;
    }

    .name-edit {
        padding: 0;
        color: inherit;
        font-size: 1.3em;
        background-color: transparent;
        border: none;
    }

    .center {
        flex-grow: 1;
        display: flex;
    }

    .windows {
        flex-grow: 1;
        display: flex;
        /* flex-direction: column; */
        height: 100%;
        position: relative;
    }
</style>