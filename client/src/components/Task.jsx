import React, { useState } from 'react';

export default function Task(props) {
  const [editMode, setMode] = useState(false);

  const activateEditMode = () => {
    setMode(true);
  };
  const toggleEditMode = () => {
    setMode(!editMode);
  };
  const deactivateEditMode = (e) => {
    setMode(false);
    editTask(e.target.value)
  };
  const deleteTask = (e) => {
    props.callDeleteTasks(props.id);
  };
  const doneTasks = (e) => {
    props.callDoneTasks(props.id, !props.complete);
  };
  const editTask = (text) => {
    console.log(props.text);
    props.callEditTasks(props.id, text);
  };

  return (
    <li className={`task ${props.addClassDone}`}>
      {editMode && (
        <input
        onKeyDown={event=>{if(event.code ==='Enter')deactivateEditMode(event)}}
        autoFocus={true}
          onBlur={(event) => {
            deactivateEditMode(event);
          }}
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

      <button onClick={toggleEditMode} className='btnEdit taskBtn'>
        Edit
      </button>

      <button onClick={(event) => doneTasks(event)} className='btnDone taskBtn'>
        Done
      </button>
    </li>
  );
}
