import React, { useState, useEffect } from 'react';
import {
  DeleteTask,
  GetTasks,
  PostTask,
  DoneTask,
  EditTask,
} from './../requests/AxiosRequest';
import FilterBtns from './FilterBtns/FilterBtns';
import Form from './Form/Form';
import TaskList from './TaskList/TaskList';

export default function UserTasks(props) {
  const [filters, setFilters] = useState({
    chronology: 'normal',
    complete: 'all',
  });
  const [appState, setAppState] = useState([]);

  const callPostTasks = async (text) => {
    const newTask = await PostTask(text, props.UserId);
    if (
      (filters.chronology === 'normal' && filters.complete == 'false') ||
      (filters.chronology === 'normal' && filters.complete == 'all')
    ) {
      setAppState([newTask, ...appState]);
    }
    if (
      (filters.chronology === 'reverse' && filters.complete == 'false') ||
      (filters.chronology === 'reverse' && filters.complete == 'all')
    ) {
      setAppState([...appState, newTask]);
    }
  };
  const callDeleteTasks = async (id) => {
    const result = await DeleteTask(id, props.UserId);
    if (result.status === 204) {
      const taskToDelete = appState.find((task) => {
        if (task.id === parseInt(id)) {
          return task;
        }
      });
      appState.splice(appState.indexOf(taskToDelete), 1);
      setAppState([...appState]);
    }
  };
  const callDoneTasks = async (id, complete) => {
    const result = await DoneTask(id, complete, props.UserId);
    const taskToDone = appState.find((task) => {
      if (task.id === result.id) {
        return task;
      }
    });
    appState[appState.indexOf(taskToDone)].complete = result.complete;
  };
  const callEditTasks = async (id, taskText) => {
    const result = await EditTask(id, taskText, props.UserId);
    if(result.status === 200){
      const taskToEdit = appState.find((task) => {
        if (task.id === result.data.id) {
          return task;
        }
      });
      appState[appState.indexOf(taskToEdit)].text = result.data.text;
    }

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
