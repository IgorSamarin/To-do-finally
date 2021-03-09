import React, { useState } from 'react';
import { loginUser } from '../../requests/auth';
import { registrationUser } from '../../requests/auth';
import s from './style.userPanel.module.css'

export default function UserPanel(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const signIn = async () => {
    const result = await loginUser(username, password);
    if (result.message) {
      alert(result.message);
    } else {
      props.setUpdate(1)
    }
  };
  const signUp = async () => {
    const result = await registrationUser(username, password);
    if (result.message) {
      alert(result.message);
    } else {
      props.setUpdate(2)
    }
  };
  return (
    <form className={s.userPanel} onSubmit={(event) => event.preventDefault()} >
      <input
        id='userName'
        onChange={(event) => setUsername(event.target.value)}
        autoComplete='off'
        type='text'
        placeholder='username'
      />
      <input
        id='password'
        onChange={(event) => setPassword(event.target.value)}
        autoComplete='off'
        type='password'
        placeholder='password'
      />
      <button onClick={signIn} id='signIn'>
        Sign IN
      </button>
      <button onClick={signUp} id='signUp'>
        Sign UP
      </button>
    </form>
  );
}
