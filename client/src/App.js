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
  const [filters, setFilters] = useState({
    chronology: 'normal',
    complete: 'all',
  });
  const [appState, setAppState] = useState([]);
  

  const callPostTasks = async (text) => {
    await PostTask(text);
    setAppState(await GetTasks(filters));
  };
  const callDeleteTasks = async (id) => {
    await DeleteTask(id);
    setAppState(await GetTasks(filters));
  };
  const callDoneTasks = async (id, complete) => {
    await DoneTask(id, complete);
    setAppState(await GetTasks(filters));
  };
  const callEditTasks = async (id, taskText) => {
    await EditTask(id, taskText);
    setAppState(await GetTasks(filters));
  };
  const updateFilters = (chronology, complete) => {
    setFilters({
      chronology: chronology,
      complete: complete,
    });
  };

  useEffect(async () => {
    setAppState(await GetTasks(filters));
  }, [filters]);

  return (
    <div className='App'>
      <h1>To do list</h1>
      <Form callPostTasks={callPostTasks} />
      <FilterBtns updateFilters={updateFilters}/>
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
