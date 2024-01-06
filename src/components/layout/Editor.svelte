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
                                <div class="filename-input" bind:innerText={file.filename} contenteditable="true"></div>
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
            <input type="checkbox" name="show-hidden" id="show-hidden" bind:checked={$showHiddenFiles}>
            <label for="show-hidden">
                {#if $showHiddenFiles}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-eye-slash" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                {/if}
            </label>
        </div>
    </div>
    <div class="editor-container">
        <Ace file={openFile} />
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

    #show-hidden ~ label {
        padding: 9px;
        cursor: pointer;
    }

    #show-hidden ~ label svg {
        fill: #fff8;
    }

    #show-hidden {
        display: none;
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
        height: 45px;
    }

    .topbar > * {
        display: flex;
        align-items: center;
    }

    .topbar-left {
        flex-grow: 1;
        width: 0;
        overflow-x: auto;
        display: block;
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
        padding: 7px 10px;
        padding-right: 4px;
        height: 100%;
        border-bottom: 2px solid #fff0;
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