const createTasks = (tasks) => {
  tasks.forEach((task) => {
    let taskLi = document.createElement('li');
    taskLi.classList = 'task';
    if (task.complete) {
      taskLi.classList += ' complete';
    }
    taskLi.setAttribute('data-id', task.id);
    taskLi.setAttribute('data-created', task.createdAt);
    taskLi.setAttribute('data-updated', task.updatedAt);
    taskLi.innerHTML += `<span class="taskText">${task.text}</span>`;
    taskLi.innerHTML += btnDelete;
    taskLi.innerHTML += btnEdit;
    taskLi.innerHTML += btnDone;
    taskList.appendChild(taskLi);
    taskLi.querySelector('.btnDelete').addEventListener('click', (event) => {
      taskLi.classList.add('animateDelete');
      DeleteTask(event.currentTarget.parentElement.getAttribute('data-id'));
    });
    taskLi.querySelector('.btnDone').addEventListener('click', (event) => {
      TaskDone(
        event.currentTarget.parentElement.classList,
        event.currentTarget.parentElement.getAttribute('data-id')
      );
    });
    taskLi.querySelector('.btnEdit').addEventListener('click', (event) => {
      let taskTest = event.currentTarget.parentElement.childNodes[0].innerText;
      let taskId = event.currentTarget.parentElement.getAttribute('data-id');
      taskLi.innerHTML = '';
      taskLi.appendChild(editForm);
      taskLi.innerHTML += btnDelete;
      taskLi.innerHTML += btnEdit;
      taskLi.innerHTML += btnDone;
    });
  });
};
