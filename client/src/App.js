import UserPanel from './components/UserPanel/UserPanel';
import './style.css';
import React, { useEffect, useState } from 'react';
import UserTasks from './components/UserTasks';
import { checkUser, signOut } from './requests/auth';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    username: '',
  });
  const [update, setUpdate] = useState();

  const handleSignOut = () => {
    signOut();
    setIsAuth(false);
    setUpdate(3)
  };

  useEffect(async () => {
    const currentUser = checkUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuth(true);
    }
  }, [update]);

  if (isAuth) {
    return (
      <div className='App'>
        <h1> {user.username}'s To do list</h1>
        <button id='signOut' onClick={handleSignOut}>
          Sign Out
        </button>
        <UserTasks UserId={user.id} />
      </div>
    );
  }

  return (
    <div className='App'>
      <h1>To do list</h1>
      <UserPanel user={user} setUpdate={setUpdate} updateUser={setUser} setIsAuth={setIsAuth} />
    </div>
  );
}

export default App;
