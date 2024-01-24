<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { get, type Readable, type Writable } from 'svelte/store';
    import monaco from '../editor'
    import { getFilenameLanguage, getPathFilename, iconMap } from '../files';
    import { v4 as uuidv4 } from 'uuid'

    type Tab = {
        id: string,
        viewState: any | null,
        path: string,
        title: string,
        icon: string,
    }

    
    let tabs: Tab[] = [];
    let openTabId: string | null = null

    let mouseX: number | null = null;
    let draggingTab: Tab | null = null;
    let draggingTabIndex: number | null = null;
    let draggingTabId: string | null = null;
    let hoveredTabIndex: number | null = null;

    $: {
        if (
            draggingTabIndex != null &&
            hoveredTabIndex != null &&
            draggingTabIndex != hoveredTabIndex
        ) {
            [tabs[draggingTabIndex], tabs[hoveredTabIndex]] = [
                tabs[hoveredTabIndex],
                tabs[draggingTabIndex],
            ];

            draggingTabIndex = hoveredTabIndex;
        }
    }

    let tabContainer = null;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let editorContainer: HTMLElement;

    export function createTab(path: string, content: string, language: string): Tab {
        let tab = tabs.find(t => t.path == path)
        if (tab != null) return tab

        let id = uuidv4()

        monaco.editor.createModel(content, language, monaco.Uri.file(id))

        tab = {
            icon: iconMap[language],
            id: id,
            path: path,
            title: getPathFilename(path),
            viewState: null,
        }

        tabs = [...tabs, tab]
        return tab
    }

    export function setOpenTab(path: string | null) {
        if (openTabId != null) {
            let oldTab = tabs.find(t => t.id == openTabId)

            if (oldTab == undefined) {
                throw new Error("Couldn't find old open tab")
            }
            oldTab.viewState = editor.saveViewState()
        }
        

        if (path != null) {
            let tab = tabs.find(t => t.path == path)
            if (tab === undefined) {
                throw new Error("Couldn't find new open tab")
            }

            openTabId = tab.id;

            let model = monaco.editor.getModel(monaco.Uri.file(tab.id))
            editor.setModel(model)

            if (tab.viewState !== null) {
                editor.restoreViewState(tab.viewState)
            }

        } else {
            editor.setModel(null)
            openTabId = null;
        }
    }

    export function closeTab(path: string) {
        let tabIndex = tabs.findIndex(t => t.path == path)
        if (tabIndex == -1) {
            throw new Error("Couldn't find tab to delete")
        }
        let tab = tabs[tabIndex]

        let model = monaco.editor.getModel(monaco.Uri.file(tab.id))
        if (model === null) {
            throw new Error("Couldn't find tab model")
        }

        model.dispose()

        if (tab.id == openTabId) {

            let newOpenTabId = null;

            if (tabs.length != 1) {
                if (tabIndex == tabs.length - 1) {
                    newOpenTabId = tabs[tabIndex-1].id
                } else {
                    newOpenTabId = tabs[tabIndex+1].id
                }
            }

            openTabId = newOpenTabId
        }

        tabs.splice(tabIndex, 1)
        tabs = tabs;
    }

    export function updateTab(oldPath: string, newPath: string, newLanguage: string) {
        let tab = tabs.find(t => t.path == oldPath)
        if (tab === undefined) {
            return
        }

        tab.path = newPath
        tab.title = getPathFilename(newPath)
        tab.icon = iconMap[newLanguage]
        
        let model = monaco.editor.getModel(monaco.Uri.file(tab.id))
        if (model === null) {
            throw new Error("Couldn't find tab model")
        }

        monaco.editor.setModelLanguage(model, newLanguage)
        tabs = tabs
    }

    export let onFileContentUpdate: Function;

    onMount(async () => {
        editor = monaco.editor.create(
            editorContainer,
            {
                automaticLayout: true,
                theme: 'vs-dark',
                model: null,
                minimap: {
                    enabled: false
                },
            }
        );

        editor.onDidChangeModelContent(() => {
            let content = editor.getValue()
            let openTab = tabs.find(t => t.id == openTabId)
            if (openTab == null) {
                throw new Error("Couldn't find open tab to send content update")
            }
            onFileContentUpdate(openTab.path, content)
        })
    });

    onDestroy(() => {
        tabs.forEach(t => {
            let model = monaco.editor.getModel(monaco.Uri.file(t.id))
            if (model == null) {
                throw new Error("On destory: couldn't find tab model to dispose.")
            }
            model.dispose()
        })
        editor.dispose();
    });

    export let fileTreeHidden = false;
</script>

<div class="tab-container" bind:this={tabContainer}>
    {#if fileTreeHidden}
        <button class="toggle-explorer icon-button" on:click={_ => {fileTreeHidden = !fileTreeHidden}}>
            <i class="codicon codicon-layout-sidebar-left"></i>
        </button>
    {/if}
    {#each tabs as tab, index (tab.id)}
        <button
            class="tab {openTabId == tab.id ? 'open' : ''}"
            draggable="true"
            on:click={(e) => {
                // TODO: Close on middle mouse click
                setOpenTab(tab.path)
            }}
            on:dragstart={(e) => {
                mouseX = e.clientX;
                draggingTab = tab;
                draggingTabIndex = index;
                draggingTabId = tab.id;
            }}
            on:drag={(e) => {
                mouseX = e.clientX;
            }}
            on:dragover={() => hoveredTabIndex = index}
            on:dragend={() => {
                draggingTabId = null;
                hoveredTabIndex = null;
            }}>
            
            <i class={tab.icon}></i>

            {tab.title}

            <button class="icon-button" on:click={() => {closeTab(tab.path)}}>
                <i class="codicon codicon-close"></i>
            </button>
        </button>
    {/each}
</div>

<div class="editor" bind:this={editorContainer} />

<style>
    .editor {
        flex-grow: 1;
        width: 100%;
        height: 100%;
    }

    .tab-container {
        background: #252526;
        display: flex;
        height: 38px;
    }

    .toggle-explorer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
    }

    .tab {
        width: min-content;
        padding-right: 8px;
        padding-left: 12px;
        background: transparent;
        color: #969696;
        border: none;
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        font-size: 14px;
    }

    .tab:hover {
        color: #b6b6b6;
        background-color: #3b3b3b;
    }

    .tab.open {
        color: white;
        background-color: #1E1E1E;
    }

    .ghost {
        pointer-events: none;
        z-index: 99;
        position: absolute;
        top: 10;
        left: 0;
    }
</style>