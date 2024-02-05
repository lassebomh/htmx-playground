<script>
  import TreeView from './treeview/TreeView'
  import Monaco from "./Monaco.svelte";
	import { Pane, Splitpanes } from 'svelte-splitpanes';

  import { sveltify } from "svelte-preprocess-react";
  import { createPortal } from "react-dom";
  import ReactDOM from "react-dom/client";
  import { renderToString } from "react-dom/server";

  export let nodes;
  export let openNodes;
  export let viewNode;
  export let nodeContents;
  export let nodeIndexer;

  
  const ReactTreeView = sveltify(
    TreeView,
    createPortal,
    ReactDOM,
    renderToString,
  );

  let mobile = window.innerWidth < 800;

  // let nodeIndexer;
  let monacoComponent;

  // $: {
  //   let newNodeIndexer = {}

  //   $nodes.forEach((node, i) => {
  //     newNodeIndexer[node.id] = i
  //   });

  //   nodeIndexer = newNodeIndexer;
  // }

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

  let fileTreePaneSize = mobile ? 85 : 20
  let lastfileTreePaneSize = fileTreePaneSize

  function toggleFileTree() {
    if (fileTreePaneSize < 5) {
      fileTreePaneSize = lastfileTreePaneSize
    } else {
      lastfileTreePaneSize = fileTreePaneSize
      fileTreePaneSize = 0
    }
  }

</script>

<main class="ce-root">
  <Splitpanes>
    <Pane bind:size={fileTreePaneSize}>
      <div class="tree-view">
        <div class="topbar">
          HTMX Playground
        </div>
        <ReactTreeView treeStore={nodes} {onNodeSelect} {onNodeDelete} />
      </div>
    </Pane>
    <Pane minSize={15}>
      <div class="editor">
        <Monaco bind:this={monacoComponent} mobile={false} {nodes} {viewNode} {openNodes} {nodeIndexer} {nodeContents}>
          <button class="toggle-explorer icon-button" on:click={_ => toggleFileTree()}>
            <i class="codicon {fileTreePaneSize < 5 ? 'codicon-folder-opened' : 'codicon-triangle-left'}"></i>
          </button>
        </Monaco>
      </div>
    </Pane>
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

  .tree-view .topbar {
    padding: 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 4px 4px 8px #0002;
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
    width: 44px;
    height: 100%;
    flex-shrink: 0;
    border-radius: 0;
  }
</style>