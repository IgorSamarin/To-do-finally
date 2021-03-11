import React, { useRef, useState } from 'react';
import s from './style.task.module.css';

export default function Task(props) {
  const [taskDone, setTaskDone] = useState(props.complete);

  const [editMode, setMode] = useState(false);
  const [newText, setNewText] = useState(props.text);
  const [inputText, setInputText] = useState('');

  const [editBodyMode, setEditBodyMode] = useState(false);
  const [newBodyText, setNewBodyText] = useState();
  const [inputBodyText, setInputBodyText] = useState('');
  const [showBody, setShowBody] = useState(false);

  const li = useRef();
  const taskBodyText = useRef();

  const toggleEditMode = () => {
    setMode(!editMode);
    if (editMode) {
      deactivateEditMode(inputText);
    }
  };
  const activateEditMode = () => {
    setMode(true);
  };
  const deactivateEditMode = (e) => {
    setMode(false);
    if (inputText.replace(/[' ']{1,}/, '') !== '' && inputText !== newText) {
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

  const activateBodyEditMode = () => {
    setEditBodyMode(true);
  };
  const deactivateBodyEditMode = () => {
    setEditBodyMode(false);
    if (
      inputBodyText.replace(/[' ']{1,}/, '') !== '' &&
      inputBodyText !== newBodyText
    ) {
      setNewBodyText(inputBodyText);
    }
  };
  const toggleShowBody = () => {
    setShowBody(!showBody);
  };

  if (props.complete) {
    return (
      <li ref={li} className={`${s.task} ${s.complete}`}>
        {editMode && (
          <input
            onKeyDown={(event) => {
              if (event.code === 'Enter') deactivateEditMode(event);
            }}
            defaultValue={newText}
            autoFocus={true}
            onChange={(event) => setInputText(event.target.value)}
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

        <button
          onClick={(event) => toggleEditMode(event)}
          className={s.taskBtn}
        >
          Edit
        </button>

        <button onClick={(event) => doneTasks(event)} className={s.taskBtn}>
          Done
        </button>
      </li>
    );
  } else {
    return (
      <li ref={li} className={`${s.task}`}>
        {editMode && (
          <input
            onKeyDown={(event) => {
              if (event.code === 'Enter') deactivateEditMode(event);
            }}
            defaultValue={newText}
            autoFocus={true}
            onChange={(event) => setInputText(event.target.value)}
            // onBlur={(event) => {
            //   deactivateEditMode(event);
            // }}
            type='text'
          />
        )}
        {!editMode && (
          <span
            onDoubleClick={() => {
              toggleShowBody();
            }}
            className='taskText'
          >
            {newText}
          </span>
        )}

        <button onClick={(event) => deleteTask(event)} className={s.taskBtn}>
          Delete
        </button>

        <button
          onClick={(event) => toggleEditMode(event)}
          className={s.taskBtn}
        >
          Edit
        </button>

        <button onClick={(event) => doneTasks(event)} className={s.taskBtn}>
          Done
        </button>
        {showBody && editBodyMode && (
          <input
            className={`${s.taskBodyInput}`}
            onKeyDown={(event) => {
              if (event.code === 'Enter') deactivateBodyEditMode(event);
            }}
            defaultValue={newBodyText}
            autoFocus={true}
            onChange={(event) => setInputBodyText(event.target.value)}
            onBlur={() => {
              deactivateBodyEditMode();
            }}
            type='text'
          />
        )}
        {showBody && !editBodyMode && (
          <span
            onClick={activateBodyEditMode}
            ref={taskBodyText}
            className={`${s.taskBodyText}`}
          >
            {newBodyText}
          </span>
        )}
      </li>
    );
  }
}
