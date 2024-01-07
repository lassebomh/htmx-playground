<script lang="ts">
    import { writable } from 'svelte/store'
    import { onMount } from 'svelte';
    import { propertyStore } from 'svelte-writable-derived';

    import Editor from "./components/layout/Editor.svelte";
    import Sandbox from "./components/layout/Sandbox.svelte";
    import Sidebar from "./components/layout/Sidebar.svelte";

    import { srcdoc, activeFileIndex, openFile, playground } from './playground';
    import Resizer from './components/Resizer.svelte';
    import NetworkViewer from './components/layout/NetworkViewer.svelte';

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
            case "json":
                return location
            default:
                throw new Error("Unknown file load method")
        }
    }

    function updateURI(method, location) {
        switch (method) {
            case "url":
                window.history.replaceState(
                    window.history.state,
                    "",
                    window.location.pathname + "?" + (new URLSearchParams({'url': encodeURIComponent(location)}).toString())
                )
                return
            case "json":
                window.history.replaceState(window.history.state, "", window.location.pathname)
                return
            default:
                throw new Error("Unknown file load method")
        }
    }

    async function loadPlayground(method, location) {
        showEditor = false;
        let pg = JSON.parse(await loadFile(method, location))
        await Promise.all(pg.files.map(async (file) => {
            if (!file.contents) {
                file.contents = await loadFile(pg.method, file.location)
            }
        }))
        playground.set(pg)
        
        updateURI(method, location)

        $activeFileIndex = $playground.files.findIndex((file) => file.filename == "server.js");
        
        setTimeout(() => showEditor = true, 50)
    }
    
    window.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'b') {
            event.stopPropagation();
            event.preventDefault()
            updateSrcdoc()
        }
    });
    
    function updateSrcdoc() {
        $srcdoc = ""

        let loader = $playground.files.find((file) => file.filename == '.loader.html').contents;
        let serverjs = $playground.files.find((file) => file.filename == 'server.js').contents;

        let meta = `<script> const files = ` + JSON.stringify($playground.files).replaceAll('/', '\\/') + `<\/script>\n`;

        let ipl = document.createElement('iframe')

        ipl.setAttribute('sandbox', 'allow-scripts');
        ipl.style.display = 'none';
        ipl.srcdoc = meta + loader.replace('///server.js', serverjs+'\n\nfetch(window.location.href+"/");');
        
        function iplListener(event) {
            if (event.data.type == "network_log" && event.data.request.url.replace('/', '').replace('index.html', '').trim() == '') {
                let index = event.data.response.body
                $srcdoc = meta+loader.replace('///server.js', serverjs)+index
                window.removeEventListener('message', iplListener)
                ipl.remove()
            }
        }

        window.addEventListener('message', iplListener)

        document.body.appendChild(ipl)
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
        initLoad = loadPlayground('url', './playgrounds/welcome/.playground.json')
    }

    async function loadPlaygroundFromURL(location) {
        if (location) {
            await loadPlayground('url', location)
            updateSrcdoc()
        } 
    }

    async function loadPlaygroundFromJSON() {
        let string = prompt("Paste the playground JSON:", "");
        if (string != null || string != "") {
            await loadPlayground('json', string)
            updateSrcdoc()
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

    async function loadExample(e) {
        await loadPlaygroundFromURL(e.target.value)
    }

</script>

{#if $playground}

<main>
    <div class="topbar">
        <div class="topbar-left">
            <img src="./logo_transparent_96.png" width="32" height="32" alt="HTMX Playground">
            <span class="name-edit" bind:textContent={$playground.name} contenteditable></span>
        </div>
        <div class="topbar-right">
            <select name="" id="languages" on:change={loadExample}>
                <option value="" selected disabled>Find examples</option>
                <option value="./playgrounds/welcome/.playground.json">Welcome</option>
                <option value="./playgrounds/clicktoedit/.playground.json">Click To Edit</option>
                <option value="./playgrounds/clicktoload/.playground.json">Click To Load</option>
                <option value="./playgrounds/infinitescroll/.playground.json">Infinite Scroll</option>
                <option value="./playgrounds/activesearch/.playground.json">Active Search</option>
                <option value="./playgrounds/boostrapmodaldialog/.playground.json">Modal Dialog in Bootstrap</option>
            </select>
            <button on:click={_ => {document.body.classList.remove('hide-popup');}}>README</button>
            <button class="reload-button" on:click={updateSrcdoc}>RELOAD (CTRL+B)</button>
            <button on:click={savePlaygroundJsonToClipboard}>Copy as JSON</button>
            <div class="load-dropdown">
              <button>Load playground</button>
              <div class="load-dropdown-content">
                <button on:click={_=>loadPlaygroundFromURL(prompt("Enter the raw URL to the playground JSON file:", ""))}>From URL</button>
                <button on:click={loadPlaygroundFromJSON}>From JSON</button>
              </div>
            </div>
        </div>
    </div>
    
    {#if showEditor}
        <div style="margin-bottom: 41px; height: 100%; display: flex;">
            <Resizer startSize='3fr' endSize='3fr'>
                <Editor slot="start" />
                <Sandbox slot="end" />
            </Resizer>
        </div>
        <NetworkViewer />
    {/if}
</main>

{/if}

<style>
    main {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
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

    .topbar-right button, .topbar-right select {
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

    .topbar-right button:hover, .topbar-right select:hover {
        border-color: #888888;
        background-color: #222;
        color: #ddd;
    }

    .topbar-right button:active, .topbar-right select:active {
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

    .topbar {
        background-color: #191919;
        height: 50px;
        padding: 0 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #fff2;
        overflow-x: hidden;
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