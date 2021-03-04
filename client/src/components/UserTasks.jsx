import React, { useState, useEffect } from 'react';
import {
  DeleteTask,
  GetTasks,
  PostTask,
  DoneTask,
  EditTask,
} from '../AxiosRequest';
import FilterBtns from './FilterBtns';
import Form from './Form';
import TaskList from './TaskList';

export default function UserTasks(props) {
  const [filters, setFilters] = useState({
    chronology: 'normal',
    complete: 'all',
  });
  const [appState, setAppState] = useState([]);

  const callPostTasks = async (text) => {
    await PostTask(text, props.UserId);
    setAppState(await GetTasks(filters, props.UserId));
  };
  const callDeleteTasks = async (id) => {
    await DeleteTask(id);
    setAppState(await GetTasks(filters, props.UserId));
  };
  const callDoneTasks = async (id, complete) => {
    await DoneTask(id, complete, props.UserId);
    setAppState(await GetTasks(filters, props.UserId));
  };
  const callEditTasks = async (id, taskText) => {
    await EditTask(id, taskText, props.UserId);
    setAppState(await GetTasks(filters, props.UserId));
  };
  const updateFilters = (chronology, complete) => {
    setFilters({
      chronology: chronology,
      complete: complete,
    });
  };

  useEffect(async () => {
    setAppState(await GetTasks(filters, props.UserId));
  }, [filters]);
  return (
    <div>
      
      <Form callPostTasks={callPostTasks} />
      <FilterBtns updateFilters={updateFilters} />
      <TaskList
        callEditTasks={callEditTasks}
        callDoneTasks={callDoneTasks}
        callDeleteTasks={callDeleteTasks}
        tasks={appState}
      />
    </div>
  );
}
