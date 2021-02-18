const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

const btnDelete = '<button class="btnDelete taskBtn">Delete</button>';
const btnEdit = '<button class="btnEdit taskBtn">Edit</button>';
const btnDone = '<button class="btnDone taskBtn">Done</button>';

taskForm.addEventListener('submit', () => {
  event.preventDefault();
  let taskText = event.target.childNodes[1].value;
  let textArr = taskText.trim().split(' ');
  if (textArr != '') {
    AddTask(taskText);
    taskForm.reset();
  }
});
async function AddTask(taskText) {
  let reqBody = { text: taskText };
  const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': `application/json` },
    body: JSON.stringify(reqBody),
  });
  if (response.ok === true) {
    const task = await response.json();
    GetItems();
  }
}
async function GetItems() {
  taskList.innerHTML = '';
  const response = await fetch('/api', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok === true) {
    const tasks = await response.json();
    createTasks(tasks);
  }
}
GetItems();

async function DeleteTask(id) {
  const response = await fetch(`/api/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok === true) {
    GetItems();
  }
}
async function TaskDone(id) {
  const response = await fetch(`/api/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok === true) {
    console.log(id);
    
  }
}
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
    taskList.prepend(taskLi);

    // taskLi.addEventListener('click', () => {
    //   console.log(`click to ${event.currentTarget.getAttribute('data-id')}`);
    // })
    taskLi.querySelector('.btnDelete').addEventListener('click', () => {
      DeleteTask(event.currentTarget.parentElement.getAttribute('data-id'));
    });
    taskLi.querySelector('.btnDone').addEventListener('click', () => {
      TaskDone(event.currentTarget.parentElement.getAttribute('data-id'));
    });
  });
};
