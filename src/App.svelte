<script lang="ts">
    import { writable } from 'svelte/store'
    import { onMount } from 'svelte';

    import defaultLoaderTags from './assets/sandbox/loader.html?raw'
    import defaultServer from './assets/sandbox/server.js?raw'
    import defaultPage from './assets/sandbox/index.html?raw'
    
    import './assets/app.css'
    import Ace from './components/Ace.svelte'

    let showHiddenFiles = false;
    let sandbox;

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

    async function getFile(schema, id) {
        // hxbox:<playground_id>:<file_id>
        // https://localhost:5500/sandbox/index.html

        switch (schema) {
            case "url":
                $files = JSON.parse(localStorage.getItem(id))
                break;
        
            default:
                throw new Error("Unknown load schema")
                break;
        }
    }

    function load() {
        const { schema, id } = getPlaygroundIdentifier()
         
        switch (schema) {
            case "local":
                $files = JSON.parse(localStorage.getItem(id))
                break;
            case "url":
                $files = JSON.parse(localStorage.getItem(id))
                break;
        
            default:
                throw new Error("Unknown load schema")
                break;
        }

        if ($files == null) throw new Error("Failed to load playground")

        $activeFileIndex = $files.findIndex((file) => file.filename == "server.js");
    }
    
    document.addEventListener('keypress', (event) => {
        if (event.ctrlKey && event.key === 'z') {
            event.stopPropagation();
            event.preventDefault()
            updateSrcdoc()
        }
    });

    function createFile() {
        files.set([...$files, {
            filename: "partial.html",
            contents: "",
            builtin: false,
        }])
        activeFileIndex.set($files.length - 1)
    }

    function deleteFile(index) {
        let selectIndex = index
        console.log($files[selectIndex]);
        
        while (!$files[selectIndex] || selectIndex == index || (!showHiddenFiles && $files[selectIndex].filename[0] == ".")) {
            selectIndex--;
        }
        
        activeFileIndex.set(selectIndex)
        files.set($files.filter((_, i) => i !== index))
    }
    
    function updateSrcdoc() {
        sandbox.srcdoc = ""

        let setup = $files.find((file) => file.filename == '.loader.html').contents
        let index = $files.find((file) => file.filename == 'index.html').contents
        let filedata = `<script> const files = ` + JSON.stringify($files).replaceAll('/', '\\/') + `<\/script>\n`;
    
        sandbox.srcdoc = filedata + setup + index;
    }

    let fileInit = (e) => {}

    onMount(async () => {
        setTimeout(() => {
            fileInit = (e) => {
                e.focus();
                document.execCommand('selectAll',false,null);
            }
            
        }, 500)

        try {
            load()
        } catch (error) {

            $activeFileIndex = 0

            $files = [
                {
                    filename: "server.js",
                    contents: defaultServer,
                    builtin: true,
                },
                {
                    filename: "index.html",
                    contents: defaultPage,
                    builtin: true,
                },
                {
                    filename: ".loader.html",
                    contents: defaultLoaderTags,
                    builtin: true,
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
                {#if showHiddenFiles || file.filename[0] != "."}
                    <button on:click={_ => $activeFileIndex = i} class="tab" class:builtin={file.builtin} class:active={i == $activeFileIndex}>
                        <div spellcheck="false" class="filename-input" type="text" bind:innerHTML={file.filename} contenteditable="true" use:fileInit></div>
                        <button on:click={_ => deleteFile(i)} class="delete-file-button" disabled={file.builtin}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </button>
                {/if}
            {/each}
            <button on:click={createFile} class="new-file-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            </button>
        {/if}
    </div>
    <div class="utilities">
        <div class="show-hidden-files">
            <label for="show-hidden-files-checkbox">Show hidden files</label>
            <input id="show-hidden-files-checkbox" type="checkbox" bind:checked={showHiddenFiles}>
        </div>
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
        flex-grow: 1;
    }

    button {
        background-color: transparent;
        border: none;
        color: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        box-sizing: border-box;
    }

    button {
        padding: 0;
    }

    .show-hidden-files {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
    }

    .tab.active:not(.builtin) .filename-input {
        cursor: text;
        pointer-events: all !important;
    }

    .tab:has(.filename-input:focus) {
        color: white;
        border-bottom-color: white;
    }
    
    .filename-input {
        padding: 2px;
        pointer-events: none;
        outline: none;
    }

    .new-file-button {
        padding: 8.5px;
        padding-bottom: 9.5px;
    }

    .new-file-button svg {
        opacity: 0.5;
    }

    .new-file-button:hover svg {
        opacity: 1;
    }

    .tab:hover .delete-file-button svg {
        opacity: 0.5;
    }
    .delete-file-button svg {
        opacity: 0;
    }
    .tab.active .delete-file-button svg {
        opacity: 0.8;
    }
    .tab.builtin .delete-file-button {
        opacity: 0;
    }

    .editor-container {
        width: 50%;
        height: 100%;
        background-color: #222222;
    }

    .editor-topbar {
        /* padding-left: 42px; */
        background-color: #1c1c1c;
        /* width: 100%; */
        display: flex;
        justify-content: space-between;
    }

    .utilities {
        /* height: 100%; */
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
        font-size: 0.9em;
        padding: 6px 10px;
        padding-right: 4px;
        height: 100%;
        border-bottom: 1px solid #fff2;
        color: #8b888f;
        gap: 0;
    }

    .tab:hover {
        background-color: #ffffff08;
        border-bottom: 1px solid #fff4;
        color: #fffa;
    }

    .tab.active {
        color: #fce550;
        border-bottom-color: #fce550;
        background-color: #ffffff12;
    }

    iframe {
        height: 100%;
        width: 50%;
    }
</style>