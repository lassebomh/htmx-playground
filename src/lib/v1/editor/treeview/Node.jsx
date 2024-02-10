import React, { useState } from "react";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { typeIcons } from '../icons'
import { v4 as uuidv4 } from 'uuid'

export const Node = (props) => {
  const indent = props.depth * 10 + 6;

  const { id, text } = props.node;

  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);

  const handleSelect = (e) => {
    props.onSelect(props.node)
  };
  
  const handleDelete = (e) => {
    e.stopPropagation()
    props.onDelete(id)
  }

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = (e) => {
    e.stopPropagation();
    setVisibleInput(true);
    // document.querySelector(`#node-${id} input`).focus()
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e) => {
    e.stopPropagation();
    setLabelText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  const handleNewFile = (e) => {
    e.stopPropagation();
    props.createChild({
        "id": uuidv4(),
        "parent": id,
        "type": "plaintext",
        "content": "",
        "text": "New file"
    })
  };

  const handleNewFolder = (e) => {
    e.stopPropagation();
    props.createChild({
        "id": uuidv4(),
        "parent": id,
        "type": "folder",
        "text": "New folder"
    })
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className={`tree-node ${props.isSelected ? 'isSelected' : ""} ${visibleInput ? 'visibleInput' : ''}`}
      style={{ paddingInlineStart: indent }}
      onClick={handleSelect}
      id={'node-'+id}
      {...dragOverProps}
    >

      {visibleInput ? (
        <>
          <div className={'inputWrapper'}>
            <input
              type="text"
              className={`textField nodeInput`}
              value={labelText}
              onChange={handleChangeText}
              onClick={e => e.stopPropagation()}
            />
            <button className="iconWrapper"
              onClick={handleSubmit}
              disabled={labelText === ""}>
              <i className={"codicon codicon-pass"}></i>
            </button>
            <button className="iconWrapper" onClick={handleCancel}>
              <i className={"codicon codicon-circle-slash"}></i>
            </button>
          </div>
        </>
      ) : (
        <>
          {props.node.type == 'folder' ? (
            <div onClick={handleToggle} className={`iconWrapper isExpandable ${props.isOpen ? "isOpen" : ""}`}>
              <i className="codicon codicon-chevron-right"></i>
            </div>
          ) : (
            <div className="iconWrapper">
              <i className={typeIcons[props.node.type]}></i>
            </div>
          )}
          <div className={'labelGridItem overflow-elipsis'}>
            {props.node.text}
          </div>
          <div className={'inputWrapper'}>
            {props.node.type == 'folder' && (
              <>
                <button onClick={handleNewFile} className="iconWrapper">
                  <i className="codicon codicon-new-file"></i>
                </button>
                <button onClick={handleNewFolder} className="iconWrapper">
                  <i className="codicon codicon-new-folder"></i>
                </button>
              </>
            )}
            <button onClick={handleShowInput} className="iconWrapper">
              <i className={"codicon codicon-pencil"}></i>
            </button>
            <button onClick={handleDelete} className="iconWrapper">
              <i className={"codicon codicon-trash"}></i>
            </button>
          </div>
        </>
      )}
      
    </div>
  );
};
