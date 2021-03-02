import React, { useState } from 'react';

export default function Task(props) {
  const [editMode, setMode] = useState(false);
  const [newText, setNewText] = useState(props.text);
  const toggleEditMode = () => {
    if (editMode && newText) {
      editTask(newText);
    }
    setMode(!editMode);
  };

  const activateEditMode = () => {
    setMode(true);
  };
  const deactivateEditMode = (e) => {
    setMode(false);
    if (newText) {
      editTask(newText);
    }
  };
  const deleteTask = () => {
    props.callDeleteTasks(props.id);
  };
  const doneTasks = () => {
    props.callDoneTasks(props.id, !props.complete);
  };
  const editTask = (text) => {
    props.callEditTasks(props.id, text);
  };

  return (
    <li className={`task ${props.addClassDone}`}>
      {editMode && (
        <input
          onChange={(event) => setNewText(event.target.value)}
          onKeyDown={(event) => {
            if (event.code === 'Enter') deactivateEditMode(event);
          }}
          defaultValue={props.text}
          autoFocus={true}
          // onBlur={(event) => {
          //   deactivateEditMode(event);
          // }}
          type='text'
        />
      )}
      {!editMode && (
        <span onDoubleClick={activateEditMode} className='taskText'>
          {props.text}
        </span>
      )}

      <button
        onClick={(event) => deleteTask(event)}
        className='btnDelete taskBtn'
      >
        Delete
      </button>

      <button
        onClick={(event) => toggleEditMode(event)}
        className='btnEdit taskBtn'
      >
        Edit
      </button>

      <button onClick={(event) => doneTasks(event)} className='btnDone taskBtn'>
        Done
      </button>
    </li>
  );
}
