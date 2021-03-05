import React, { useState } from 'react';
import s from './style.form.module.css';

export default function Form(props) {
  const [text, setText] = useState('');
  const submitForm = (e) => {
    e.preventDefault();
    if (text !== '') {
      props.callPostTasks(text);
    }
    setText('');
    e.target.reset();
  };

  return (
    <form className={s.taskForm} onSubmit={(event) => submitForm(event)}>
      <input
        type='text'
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button type='submit'>Add</button>
    </form>
  );
}
