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
            file.contents = await loadFile(pg.method, file.location)
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

    async function save() {
        let body = {
            'public': true,
            'files': {}
        }

        $playground.files.forEach(file => {
            body.files[file.filename] = {
                'content': file.contents
            }
        });

        let response = await fetch('https://api.github.com/gists', {
            method: 'POST',
            body: JSON.stringify(body),
            // mode: '',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': 'Bearer ' + localStorage.getItem('gh_token'),
                'Content-Type': 'application/json'
            }
        })

        console.log(response);
        console.log(await response.json());
    }
    
    let initLoad = loadPlayground('url', './playgrounds/minimal/.playground.json')
    
    onMount(async () => {
        await initLoad;
        updateSrcdoc()
    })

</script>

{#if $playground}

<main>
    <div class="topbar">
        <div class="topbar-left">
            <img src="./logo_transparent_96.png" alt="">
            <span class="name-edit" type="text" bind:textContent={$playground.name} contenteditable></span>
        </div>
        <div class="topbar-right">
            <button class="reload-button" on:click={updateSrcdoc}>RELOAD (CTRL+B)</button>
            <a href="https://www.buymeacoffee.com/lassebomh">Monetary Appreciation</a>
            <a href="https://github.com/lassebomh/htmx-playground">Star on GitHub</a>
            <!-- <button on:click={save}>Save</button>
            <button>Share</button>
            <button>Donate</button> -->
        </div>
    </div>
    
    {#if hasReadme}
        <Resizer startSize='300px' endSize='6fr'>
            <Sidebar slot="start" />
            <Resizer slot="end" startSize='3fr' endSize='2fr'>
                <Editor slot="start" />
                <Sandbox slot="end" />
            </Resizer>
        </Resizer>
    {:else}
        <Resizer slot="end" startSize='3fr' endSize='2fr'>
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
        border-color: #fff8;
        background-color: #fff2;
        color: #fffd;
    }

    .topbar-right button:active, .topbar-right a:active {
        border-color: #fff6;
        background-color: #fff1;
        color: #fffa;
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