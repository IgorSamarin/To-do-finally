import React from 'react';
import Task from './Task';

export default function TaskList(props) {
  let tasks = props.tasks.map((task) => {
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

  return <ul id='taskList'>{tasks}</ul>;
}
