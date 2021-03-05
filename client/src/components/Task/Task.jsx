import React, { useEffect, useRef, useState } from 'react';
import s from './style.task.module.css';

export default function Task(props) {
  const [editMode, setMode] = useState(false);
  const [newText, setNewText] = useState(props.text);
  const [taskDone, setTaskDone] = useState(props.complete);
  const [inputText, setInputText]= useState()
  const li = useRef();
  const toggleEditMode = () => {
    setMode(!editMode);
    if(editMode){
      deactivateEditMode(inputText)
    }
  };

  const activateEditMode = () => {
    setMode(true);
  };
  const deactivateEditMode = (e) => {
    setMode(false);
    if ((inputText.replace(/[' ']{1,}/, '') !== '') && (inputText !== newText) ) {
      props.callEditTasks(props.id, newText);
      setNewText(inputText);
    }
  };
  const deleteTask = () => {
    props.callDeleteTasks(props.id);
  };
  const doneTasks = () => {
    setTaskDone(!taskDone);
    li.current.classList.toggle(`${s.complete}`);
    props.callDoneTasks(props.id, taskDone);
  };

  return (
    <li ref={li} className={`${s.task}`}>
      {editMode && (
        <input
          onKeyDown={(event) => {
            if (event.code === 'Enter') deactivateEditMode(event);
          }}
          defaultValue={newText}
          autoFocus={true}
          onChange={event => setInputText(event.target.value)}
          // onBlur={(event) => {
          //   deactivateEditMode(event);
          // }}
          type='text'
        />
      )}
      {!editMode && (
        <span onDoubleClick={activateEditMode} className='taskText'>
          {newText}
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
