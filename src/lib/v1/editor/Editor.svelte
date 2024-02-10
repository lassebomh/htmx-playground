<script>
  import TreeView from './treeview/TreeView'
  import Monaco from "./Monaco.svelte";
	import { Pane, Splitpanes } from 'svelte-splitpanes';
  import { v4 as uuidv4 } from 'uuid'

  import { sveltify } from "svelte-preprocess-react";
  import { createPortal } from "react-dom";
  import ReactDOM from "react-dom/client";
  import { renderToString } from "react-dom/server";

  export let mobile;
  export let hideFileTree = false;

  export let nodes;
  export let openNodes;
  export let viewNode;
  export let nodeContents;
  export let nodeIndexer;
  export let title;


  let main;
  
  const ReactTreeView = sveltify(
    TreeView,
    createPortal,
    ReactDOM,
    renderToString,
  );

  function onNodeSelect(node) {
    if (node.type !== 'folder') {
      if ($openNodes.indexOf(node.id) === -1) {
        $openNodes = [...$openNodes, node.id];
      }
      $viewNode = node.id
    }
  }
  function onNodeDelete(deleteIds) {
    let openNodesToBeDeleted = []

    let newOpenNodes = $openNodes.filter((nodeId) => {
      let included = deleteIds.includes(nodeId)
      if (included) {
        openNodesToBeDeleted.push(nodeId)
      }
      return !included
    });

    if (deleteIds.includes($viewNode)) {
      let viewIndex = $openNodes.indexOf($viewNode)

      if (newOpenNodes.length > 0) {
        $viewNode = newOpenNodes[Math.min(viewIndex, newOpenNodes.length - 1)]
      } else {
        $viewNode = null;
      }
    }

    let newNodeContents = $nodeContents

    deleteIds.forEach(nodeId => {
      delete newNodeContents[nodeId]
    });
   
    $nodeContents = newNodeContents;
    $openNodes = newOpenNodes;
  }

  let fileTreePaneSize = mobile ? 100 : 20
  let lastfileTreePanePx;

  function toggleFileTree() {
    if (hideFileTree) {
      fileTreePaneSize = Math.min((lastfileTreePanePx/main.clientWidth) * 100, 100)
    } else {
      lastfileTreePanePx = fileTreePaneSize/100 * main.clientWidth;
    }
    hideFileTree = !hideFileTree;
  }

  const handleNewFile = (e) => {
    $nodes = [...$nodes, {
        "id": uuidv4(),
        "parent": null,
        "type": "plaintext",
        "content": "",
        "text": "New file"
    }]
  };
  const handleNewFolder = (e) => {
    $nodes = [...$nodes, {
        "id": uuidv4(),
        "parent": null,
        "type": "folder",
        "text": "New folder"
    }]
  };

</script>

<main bind:this={main} class="ce-root">
  <Splitpanes>
    {#if !hideFileTree}
      <Pane bind:size={fileTreePaneSize} >
        <div class="tree-view">
          <div class="topbar">
            <!-- <img width="24" src="/img/logo_transparent_96.png" alt="HTMX Playground"> -->
            {#if !mobile}
              <button class="toggle-explorer icon-button" on:click={_ => toggleFileTree()}>
                <i class="codicon codicon-triangle-left"></i>
              </button>
            {/if}
            <span class="sandbox-title overflow-elipsis" contenteditable="true" bind:innerText={$title}>
            </span>
            <div class="root-buttons">
              <button on:click={handleNewFile} class="iconWrapper">
                <i class="codicon codicon-new-file"></i>
              </button>
              <button on:click={handleNewFolder} class="iconWrapper">
                <i class="codicon codicon-new-folder"></i>
              </button>
            </div>
          </div>
          <ReactTreeView treeStore={nodes} {onNodeSelect} {onNodeDelete} />
        </div>
      </Pane>
    {/if}
    {#if !mobile || hideFileTree}
      <Pane>
        <div class="editor">
          <Monaco {mobile} {nodes} {viewNode} {openNodes} {nodeIndexer} {nodeContents}>
            {#if !mobile && hideFileTree}
              <button class="toggle-explorer icon-button" on:click={_ => toggleFileTree()}>
                <i class="codicon codicon-root-folder-opened"></i>
              </button>
            {/if}
          </Monaco>
        </div>
      </Pane>
    {/if}
  </Splitpanes>
</main>

<style>
  .ce-root {
    margin: 0;
    padding: 0;
    height: 100%;
    color: white;
    font-family: Arial, sans-serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    background-color: #1E1E1E;
  }

  .tree-view {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
  }

  .topbar {
    padding-right: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 4px 4px 8px #0002;
  }

  .root-buttons {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  .sandbox-title {
    flex-grow: 1;
    margin-left: 8px;
  }
  

  .editor {
    flex-grow: 1;
    height: 100%;
    background-color: #1A1A1A;
  }

  .toggle-explorer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 100%;
    flex-shrink: 0;
    border-radius: 0;
  }
</style>