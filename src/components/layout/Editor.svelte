<script>
    import Ace from "../Ace.svelte";
    import { openFile, playground, activeFileIndex } from "../../playground";
    import { showHiddenFiles } from "../../session";
  import NetworkViewer from "./NetworkViewer.svelte";

    function deleteFile(index) {
        let selectIndex = index
        
        while (!$playground.files[selectIndex] || selectIndex == index || (!$showHiddenFiles && $playground.files[selectIndex].filename[0] == ".")) {
            selectIndex--;
        }
        
        playground.set({
            ...$playground,
            "files": $playground.files.filter((_, i) => i !== index)
        })

        activeFileIndex.set(selectIndex)

    }

    function createFile() {
        playground.set({
            ...$playground,
            "files": [
                ...$playground.files,
                {
                    filename: "partial.html",
                    contents: "",
                    builtin: false,
                }
            ]
        })

        activeFileIndex.set($playground.files.length - 1)
    }

    function fileInit(e) {
        e.focus();
        document.execCommand('selectAll',false,null);
    }

    $: console.log($showHiddenFiles);

</script>

{#if $playground != null}
    
<main>
    <div class="topbar">
        <div class="topbar-left">
            <div class="tabs">
                {#each $playground.files as file, i}
                    {#if $showHiddenFiles || file.filename[0] != "."}
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
        <div class="topbar-right">
            <label for="show-hidden">
                Show hidden
            </label>
            <input type="checkbox" name="show-hidden" id="show-hidden" bind:checked={$showHiddenFiles}>
        </div>
    </div>
    <div class="editor-container">
        {#if $openFile != null}
            <Ace file={openFile} />
            <NetworkViewer />
        {/if}
    </div>
</main>

{/if}

<style>
    main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .editor-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .topbar {
        /* padding-left: 42px; */
        background-color: #222222;
        /* width: 100%; */
        display: flex;
        justify-content: space-between;
        height: 36px;
        padding-bottom: 4px;
    }

    .topbar > * {
        height: inherit;
        display: flex;
        align-items: center;
    }

    .topbar-left {
        flex-grow: 1;
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

</style>