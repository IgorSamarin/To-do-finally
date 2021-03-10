import React from 'react';
import Task from '../Task/Task';
import s from './style.taskList.module.css';

export default function TaskList(props) {
  let tasks;
  if (!props.tasks) {
    tasks = 'err';
  } else if (props.tasks.length === 0) {
    tasks = 'no tasks';
  } else {
    tasks = props.tasks.map((task) => {
      if (task.complete) {
        return (
          <Task
            addClassDone={'complete'}
            callDoneTasks={props.callDoneTasks}
            callDeleteTasks={props.callDeleteTasks}
            callEditTasks={props.callEditTasks}
            id={task.id}
            key={task.id}
            text={task.text}
            complete={task.complete}
          />
        );
      } else {
        return (
          <Task
            addClassDone={''}
            callDoneTasks={props.callDoneTasks}
            callDeleteTasks={props.callDeleteTasks}
            callEditTasks={props.callEditTasks}
            id={task.id}
            key={task.id}
            text={task.text}
            complete={task.complete}
          />
        );
      }
    });
  }

  return <ul className={s.taskList}>{tasks}</ul>;
}
