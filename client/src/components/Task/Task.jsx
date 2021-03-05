import React, { useEffect, useRef, useState } from 'react';
import s from './style.task.module.css';

export default function Task(props) {
  const [editMode, setMode] = useState(false);
  const [newText, setNewText] = useState(props.text);
  const [taskDone, setTaskDone] = useState(props.complete);
  const li = useRef();
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
    setTaskDone(!taskDone);
    li.current.classList.toggle(`${s.complete}`)
    props.callDoneTasks(props.id, taskDone);
  };
  const editTask = (text) => {
    props.callEditTasks(props.id, text);
  };


  return (
    <li ref={li} className={`${s.task}`}>
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

      <button onClick={(event) => deleteTask(event)} className={s.taskBtn}>
        Delete
      </button>

      <button onClick={(event) => toggleEditMode(event)} className={s.taskBtn}>
        Edit
      </button>

      <button onClick={(event) => doneTasks(event)} className={s.taskBtn}>
        Done
      </button>
    </li>
  );
}
