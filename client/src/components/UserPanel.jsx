import React, { useState } from 'react';


export default function UserPanel() {
  // const [username, setUsername] = useState(props.user.username);
  // const [password, setPassword] = useState(props.user.password);
  return (
    <form id='userPanel'>
      <input
        id='userName'
        
        autoComplete='off'
        type='text'
        placeholder='username'
      />
      <input
        id='password'
        autoComplete='off'
        type='text'
        placeholder='password'
      />
      <button type='submit' id='signIn'>
        Sign IN
      </button>
      <button type='submit' id='signUp'>
        Sign UP
      </button>
    </form>
  );
}
