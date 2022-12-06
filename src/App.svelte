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
            <input class="name-edit" type="text" bind:value={$playground.name}>
        </div>
        <div class="topbar-right">
            <button class="reload-button" on:click={updateSrcdoc}>RELOAD (CTRL+B)</button>
            <button on:click={save}>Save</button>
            <button>Share</button>
            <button>Donate</button>
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
        border: 1px solid #fff5;
        font-family: monospace;
        color: #fffa;
        padding: 0.5em;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .reload-button:hover {
        border-color: #fff8;
        background-color: #fff2;
        color: #fffd;
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
    }
</style>