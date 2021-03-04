
import UserPanel from './components/UserPanel';

import './style.css';
import React, { useEffect, useState } from 'react';

import UserTasks from './components/UserTasks';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user , setUser]=useState({
    id: 0,
    username: ''
  })

useEffect(() => {
  console.log(user);
}, [user])

  if (isAuth) {
    return (
      <div className='App'>
        <h1>To do list</h1>
        <UserTasks />
      </div>
    );
  }

  return (
    <div className='App'>
      <h1>To do list</h1>
      <UserPanel user={user} updateUser={setUser} setIsAuth={setIsAuth}/>
    </div>
  );
}

export default App;
