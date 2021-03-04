import React, { useState } from 'react';
import { authentificationUser } from '../AxiosRequest';
import { registrationUser } from '../AxiosRequest';

export default function UserPanel(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const signIn = async () => {
    const result = await authentificationUser(username, password);
    if (result.message) {
      alert(result.message);
    } else {
      props.updateUser(result);
      props.setIsAuth(true);
    }
  };
  const signUp = async () => {
    const result = await registrationUser(username, password);
    if (result.message) {
      alert(result.message);
    } else {
      props.updateUser(result)
      props.setIsAuth(true);
    }
  };
  return (
    <form onSubmit={(event) => event.preventDefault()} id='userPanel'>
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
