<script lang="ts">
    import { writable } from 'svelte/store'
    import { onMount } from 'svelte';
    import { propertyStore } from 'svelte-writable-derived';

    import Editor from "./components/layout/Editor.svelte";
    import Sandbox from "./components/layout/Sandbox.svelte";
    import Sidebar from "./components/layout/Sidebar.svelte";

    import { srcdoc, activeFileIndex, openFile, playground } from './playground';
    import Resizer from './components/Resizer.svelte';

    let TemplateLoader = {
        getSource: (name) => ({
            src: ($playground.files.find(file => name == file.filename) || {contents: ""}).contents,
            path: name
        })
    }

    var templates = new nunjucks.Environment(TemplateLoader, {
        autoescape: false
    })

    let hasReadme = false;

    $: if ($playground != null && $activeFileIndex != null) {
        $openFile = $playground.files[$activeFileIndex];
        hasReadme = $playground.files.find((file) => file.filename == '.readme.md') != null;
    }

    async function loadFile(method, location) {
        switch (method) {
            case "url":
                let file = await (await fetch(location)).text()
                return file
            default:
                throw new Error("Unknown file load method")
        }
    }

    async function loadPlayground(method, location) {
        let pg = JSON.parse(await loadFile(method, location))
        await Promise.all(pg.files.map(async (file) => {
            if (!file.contents) {
                file.contents = await loadFile(pg.method, file.location)
            }
        }))
        playground.set(pg)
        $activeFileIndex = $playground.files.findIndex((file) => file.filename == "server.js");
    }
    
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'b') {
            event.stopPropagation();
            event.preventDefault()
            updateSrcdoc()
        }
    });
    
    function updateSrcdoc() {
        $srcdoc = ""

        let loader = $playground.files.find((file) => file.filename == '.loader.html').contents;
        let index = $playground.files.find((file) => file.filename == 'index.html').contents;
        let meta = `<script> const files = ` + JSON.stringify($playground.files).replaceAll('/', '\\/') + `<\/script>\n`;

        setTimeout(_ => $srcdoc = meta+templates.renderString(loader+index), 1)
    }

    function serializePlaygroundToJson() {

        let _playground = structuredClone($playground);

        for (let i = 0; i < _playground.files.length; i++) {
            const file = _playground.files[i];
            if (file.filename != ".playground.json") {
                _playground.files[i].contents = file.contents;
            }
        }

        return _playground;
    }
    
    let loaderEntry = new URLSearchParams(window.location.search).entries().next();
    let initLoad;
    let showEditor = true;

    if (loaderEntry.value) {
        let [method, location] = loaderEntry.value;
        initLoad = loadPlayground(method, decodeURIComponent(location))
    } else {
        initLoad = loadPlayground('url', './playgrounds/minimal/.playground.json')
    }

    async function loadPlaygroundFromURL() {
        let location = prompt("Enter the raw URL to the playground JSON file:", "");
        if (location != null || location != "") {
            loadPlayground('url', location)
            updateSrcdoc()
            window.history.replaceState(window.history.state, "", window.location.pathname + "?" + (new URLSearchParams({'url': encodeURIComponent(location)}).toString()))

            showEditor = false;
            setTimeout(() => showEditor = true, 50)
        } 
    }

    async function loadPlaygroundFromJSON() {
        let string = prompt("Paste the playground JSON:", "");
        if (string != null || string != "") {
            playground.set(JSON.parse(string))
            console.log($playground);
            
            $activeFileIndex = $playground.files.findIndex((file) => file.filename == "server.js");
            updateSrcdoc()
            window.history.replaceState(window.history.state, "", window.location.pathname)

            showEditor = false;
            setTimeout(() => showEditor = true, 50)
        }

    }

    onMount(async () => {
        await initLoad;
        updateSrcdoc()
    })

    function savePlaygroundJsonToClipboard() {
        let _playground = serializePlaygroundToJson();
        let text = JSON.stringify(_playground);
        navigator.clipboard.writeText(text);
    }

</script>

{#if $playground}

<main>
    <div class="topbar">
        <div class="topbar-left">
            <img src="./logo_transparent_96.png" alt="">
            <span class="name-edit" bind:textContent={$playground.name} contenteditable></span>
        </div>
        <div class="topbar-right">
            <button class="reload-button" on:click={updateSrcdoc}>RELOAD (CTRL+B)</button>
            <button on:click={savePlaygroundJsonToClipboard}>Copy as JSON</button>
            <div class="load-dropdown">
              <button>Load playground</button>
              <div class="load-dropdown-content">
                <button on:click={loadPlaygroundFromURL}>From URL</button>
                <button on:click={loadPlaygroundFromJSON}>From JSON</button>
              </div>
            </div>
        </div>
    </div>
    
    {#if showEditor}
        <Resizer slot="end" startSize='3fr' endSize='3fr'>
            <Editor slot="start" />
            <Sandbox slot="end" />
        </Resizer>
    {/if}
</main>

{/if}

<style>
    main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #222222;
    }
    
    .reload-button {
        border-color: #0f28 !important;
        background-color: #0f23 !important;
        color: #fffe !important;
        font-weight: 600;
    }

    .reload-button:hover {
        border-color: #0f27 !important;
        background-color: #0f24 !important;
        color: #ffff !important;
    }

    .reload-button:active {
        border-color: #0f29 !important;
        background-color: #0f23 !important;
    }

    .topbar-right button, .topbar-right a {
        border: 1px solid #fff5;
        font-family: monospace;
        color: #fffa;
        padding: 0 0.7em;
        height: 2.2em;
        background-color: #191919;
        /* padding-bottom: 0.6em; */
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        font-size: 0.9em;
        text-decoration: none;
    }

    .topbar-right button:hover, .topbar-right a:hover {
        border-color: #888888;
        background-color: #222;
        color: #ddd;
    }

    .topbar-right button:active, .topbar-right a:active {
        border-color: #666;
        background-color: #111;
        color: #aaa;
    }

    .load-dropdown {
        position: relative;
        display: inline-block;
    }
    .load-dropdown-content {
        display: none;
        position: absolute;
        z-index: 1;
        left: 0;
    }
    .load-dropdown:hover .load-dropdown-content {
        display: block;
    }

    .topbar-left {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3em;
    }

    .topbar-left img {
        height: 2em;
    }

    .topbar {
        background-color: #191919;
        height: 50px;
        padding: 0 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #fff2;
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
        padding: 0.2em;
        min-width: 40px;
    }
</style>