import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { Tree, MultiBackend, getBackendOptions, getDescendants } from "@minoru/react-dnd-treeview";
import { Node } from "./Node";
import { useStore } from "svelte-preprocess-react";
import { typeExtensions } from "../icons";

import './Node.css'
import './TreeView.css'

function TreeView({treeStore, onNodeSelect, onNodeDelete}) {
  const treeData = useStore(treeStore)
  const setTreeData = treeStore.set

  const handleDrop = (newTree) => {
    newTree.forEach((node) => {
      if (node.id != '__root__' && node.parent === null) {
        node.parent = '__root__'
      }
    })
    setTreeData(newTree)
  };

  const [selectedNode, setSelectedNode] = useState(null);
  const handleSelect = (node) => {
    setSelectedNode(node);
    onNodeSelect(node)
  };

  const handleTextChange = (id, value) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {

        let type = node.type;
        
        if (type != 'folder') {
          let split = value.split('.')
          type = typeExtensions[split[split.length-1]] || 'plaintext'
        }

        return {
          ...node,
          text: value,
          type: type,
        };
      }

      return node;
    });

    setTreeData(newTree);
  };

  const handleDelete = (id) => {
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id)
    ];
    onNodeDelete(deleteIds)

    const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

    setTreeData(newTree);
  };

  const createChild = (node) => {
    const newTree = [...treeData, node]
    setTreeData(newTree);
  }

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
      tree={treeData}
      rootId={null}
      canDrop={(currentTree, { dragSourceId, dropTargetId, dragSource, dropTarget }) => {
        if (dropTargetId === null) return true
        if (dragSourceId == dropTargetId) return false
        if (dropTarget.type != 'folder') return false
        return !getDescendants(currentTree, dragSourceId).includes(dropTarget)
      }}
      canDrag={(node) => {
        return node.id != '__root__'
      }}
      initialOpen={true}
      render={(node, { depth, isOpen, onToggle }) => (
        <Node
          node={node}
          depth={depth}
          isOpen={isOpen}
          onToggle={onToggle}
          onDelete={handleDelete}
          createChild={createChild}
          onSelect={handleSelect}
          isSelected={node.id === selectedNode?.id}
          onTextChange={handleTextChange}
        />
      )}
      onDrop={handleDrop}
      classes={{
        root: 'tree-root',
        draggingSource: 'draggingSource',
        dropTarget: 'dropTarget',
      }}
      />
    </DndProvider>
  );
}

export default TreeView;
