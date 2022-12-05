<script lang="ts">
    import { writable } from 'svelte/store'
    import { onMount } from 'svelte';
    
    import Ace from './components/Ace.svelte'
    import { propertyStore } from 'svelte-writable-derived';
    
    let showHiddenFiles = false;
    let sandbox;

    let playground = writable(null)
    let files = writable(null);
    let openFile = writable(null);

    let activeFileIndex = writable(null);

    $: if ($files != null && $activeFileIndex != null) {
        $openFile = $files[$activeFileIndex]
    }

    let logs = []
    let network = []
    
    // import DOMPurify from 'isomorphic-dompurify';
    // import { marked } from 'marked';
    // let readme_html = DOMPurify.sanitize(marked.parse(`# hello\n\nmy name is john`));

    
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
        files = propertyStore(playground, 'files')
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
        
        while (!$files[selectIndex] || selectIndex == index || (!showHiddenFiles && $files[selectIndex].filename[0] == ".")) {
            selectIndex--;
        }
        
        activeFileIndex.set(selectIndex)
        files.set($files.filter((_, i) => i !== index))
    }
    
    function updateSrcdoc() {
        sandbox.srcdoc = ""

        let loader = $files.find((file) => file.filename == '.loader.html').contents
        let index = $files.find((file) => file.filename == 'index.html').contents
        let filedata = `<script> const files = ` + JSON.stringify($files).replaceAll('/', '\\/') + `<\/script>\n`;
    
        sandbox.srcdoc = filedata + loader + index;
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
    <div class="sidebar">
        <div class="sidebar-top">
            <div class="playground-name">
                {$playground.name}
            </div>
        </div>
        <div class="sidebar-contents">
            {@html readme_html}

        </div>
    </div>
    <div class="center">
        <div class="editor-topbar">
            <div class="topbar-left">
                <div class="tabs">
                    {#each $files as file, i}
                        {#if showHiddenFiles || file.filename[0] != "."}
                            <button on:click={_ => $activeFileIndex = i} class="tab" class:builtin={file.builtin} class:active={i == $activeFileIndex}>
                                {#if !file.builtin && i == $activeFileIndex}
                                    <div spellcheck="false" class="filename-input" bind:innerHTML={file.filename} contenteditable="true" use:fileInit></div>
                                {:else}
                                    <div class="filename-input">{file.filename}</div>
                                    {/if}
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
                </div>
            </div>
            <div class="utilities">
                <div class="show-hidden-files">
                    <label for="show-hidden-files-checkbox">Show hidden files</label>
                    <input id="show-hidden-files-checkbox" type="checkbox" bind:checked={showHiddenFiles}>
                </div>
                <button on:click={updateSrcdoc} class="reload-button">
                    Reload
                </button>
                <!-- <button on:click={save} class="save-button">
                    Save
                </button> -->
            </div>
        </div>
        <div class="windows">
            <div class="editor-container">
                {#if $playground}
                    <Ace file={openFile} />
                {/if}
            </div>
            <iframe bind:this={sandbox} title="Sandbox" frameborder="0" sandbox="allow-scripts"></iframe> 
        </div>
    </div>
</main>

{/if}

<style>
    .sidebar-top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 8px;
        
        height: 35px;
        border-bottom: 1px solid #fff1;
    }

    main {
        display: flex;
        height: 100%;
        background-color: #191919;
    }

    .sidebar {
        min-width: 400px;
        height: 100%;
    }

    .windows {
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        background-color: #222222;
    }

    .windows > * {
        width: 100%;
        flex-grow: 1;
        /* height: 50%; */
    }

    .center {
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
        /* width: 50%; */
        height: 100%;
        background-color: #222222;
        position: relative;
    }

    .editor-topbar {
        /* padding-left: 42px; */
        background-color: #1e1e1e;
        /* width: 100%; */
        display: flex;
        justify-content: space-between;
        height: 36px;
    }

    .editor-topbar > * {
        height: inherit;
    }

    .topbar-left {
        display: flex;
        align-items: center;
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
        height: inherit;
    }

    .tab {
        font-size: 0.9em;
        padding: 6px 10px;
        padding-right: 4px;
        height: 100%;
        border-bottom: 2px solid #fff2;
        color: #8b888f;
        gap: 0;
    }

    .tab:hover {
        background-color: #ffffff08;
        border-bottom-color: #fff4;
        color: #fffa;
    }

    .tab.active {
        color: #fce550;
        border-bottom-color: #fce550;
        background-color: #ffffff12;
    }

    iframe {
        height: 100%;
        /* width: 50%; */
    }
</style>