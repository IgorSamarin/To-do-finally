import React, { useState } from 'react';

export default function Form(props) {
  const [text, setText] = useState('');
  const submitForm = (e) => {
    e.preventDefault();
    props.callPostTasks(text);
    e.target.reset();
  };

  return (
    <form onSubmit={(event) => submitForm(event)} id='taskForm'>
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
