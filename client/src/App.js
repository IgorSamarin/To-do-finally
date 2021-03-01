import FilterBtns from './components/FilterBtns';
import Form from './components/Form';
import TaskList from './components/TaskList';
import './style.css';
import React, { useEffect, useState } from 'react';
import {
  DeleteTask,
  GetTasks,
  PostTask,
  DoneTask,
  EditTask,
} from './AxiosRequest';

function App() {
  const [appState, setAppState] = useState([]);

  const callPostTasks = async (text) => {
    await PostTask(text);
    setAppState(await GetTasks());
  };
  const callDeleteTasks = async (id) => {
    await DeleteTask(id);
    setAppState(await GetTasks());
  };
  const callDoneTasks = async (id, complete) => {
    await DoneTask(id, complete);
    setAppState(await GetTasks());
  };
  const callEditTasks = async (id, taskText) => {
    await EditTask(id, taskText);
    setAppState(await GetTasks());
  };

  useEffect(async () => {
    setAppState(await GetTasks());
  }, [setAppState]);

  return (
    <div className='App'>
      <h1>To do list</h1>
      <Form callPostTasks={callPostTasks} />
      <FilterBtns />
      <TaskList
        callEditTasks={callEditTasks}
        callDoneTasks={callDoneTasks}
        callDeleteTasks={callDeleteTasks}
        tasks={appState}
      />
    </div>
  );
}

export default App;
