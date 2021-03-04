import UserPanel from './components/UserPanel';
import './style.css';
import React, { useEffect, useState } from 'react';
import UserTasks from './components/UserTasks';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    username: '',
  });

  const offIsAuth =async(e)=>{
    setIsAuth(false)
  }
  useEffect(async() => {
  }, [user]);

  if (isAuth) {
    return (
      <div className='App'>
        <h1> {user.username}'s To do list</h1>        
        <button id='signOut' onClick={event =>offIsAuth(event) } >Sign Out</button>
        <UserTasks />
      </div>
    );
  }

  return (
    <div className='App'>
      <h1>To do list</h1>
      <UserPanel user={user} updateUser={setUser} setIsAuth={setIsAuth} />
    </div>
  );
}

export default App;
