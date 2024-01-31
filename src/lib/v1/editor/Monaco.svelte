<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import monaco from './monaco'
    import {typeIcons} from './icons'

    export let nodes;
    export let openNodes;
    export let viewNode;
    export let nodeIndexer;
    export let nodeContents;

    export let mobile: boolean;

    let editor: monaco.editor.IStandaloneCodeEditor;
    let editorContainer: HTMLElement;

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
                lineNumbers: mobile ? 'off' : 'on'
            }
        );


        editor.onDidChangeModelContent(() => {
            let content = editor.getValue()
            $nodeContents[$viewNode] = content;
        })
    });

    onDestroy(() => {
        editor.dispose();
    });

    function editorModel(elem, node) {
        elem._nodeId = node.id
        elem._nodeType = node.type
        elem._model = monaco.editor.createModel($nodeContents[node.id], elem._nodeType)

        elem.handleClick = () => {
            editor.setModel(elem._model)
        }

        elem.handleClose = (e) => {
            e.stopPropagation()

            let newOpenNodes = $openNodes.filter((nodeId) => nodeId != elem._nodeId)

            if ($viewNode == elem._nodeId) {
                let viewIndex = $openNodes.indexOf($viewNode)
                console.log('viewIndex', viewIndex);
                

                if (newOpenNodes.length > 0) {
                    $viewNode = newOpenNodes[Math.min(viewIndex, newOpenNodes.length - 1)]
                } else {
                    $viewNode = null;
                }
            }
            
            $openNodes = newOpenNodes
        }

        return {
            update(node) {
                if (node.type != elem._nodeType) {
                    elem._nodeType = node.type
                    monaco.editor.setModelLanguage(elem._model, elem._nodeType)
                }
            },
            destroy() {
                elem._model.dispose()
            }
        }
    }

    let tabs = []

    function activateTab(viewNode, tabs) {
        if (viewNode != null) {
            let tab = tabs.find((elem) => elem && elem._nodeId == viewNode)
            if (tab !== undefined) {
                tab.handleClick()
            }
        } else {
            editor.setModel(null)
        }
    }

    $: {
        if (editor) {
            activateTab($viewNode, tabs)
        }
    }

</script>

<main>
    <div class="topbar">
        <slot></slot>
        {#each $openNodes as nodeId, i (nodeId)}
            {@const node = $nodes[nodeIndexer[nodeId]]}
            {#if node}
                <button
                    bind:this={tabs[i]}
                    use:editorModel={node}
                    class="tab {$viewNode == nodeId ? 'viewing' : ''}"
                    draggable="true"
                    on:click={() => {$viewNode = nodeId;}}>
                    
                    <div class="iconWrapper">
                        <i class="codicon codicon-{typeIcons[node.type]}"></i>
                    </div>

                    <span>
                        {node.text}
                    </span>
        
                    <button class="icon-button" on:click={tabs[i].handleClose}>
                        <i class="codicon codicon-close"></i>
                    </button>
                </button>
            {/if}
        {/each}
      </div>
    <div class="editor" bind:this={editorContainer} />
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .editor {
        flex-grow: 1;
    }

    :global(.monaco-editor) {
        --vscode-editor-background: transparent !important;
        --vscode-editorGutter-background: transparent !important;
        --vscode-scrollbar-shadow: transparent !important;
        /* position: absolute !important; */
    }

    .tab {
        width: max-content;
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
        flex-shrink: 0;
    }
    .tab:hover {
        color: #b6b6b6;
        background-color: #3b3b3b;
    }
    .tab.viewing {
        color: white;
        background-color: #1A1A1A;
    }
</style>