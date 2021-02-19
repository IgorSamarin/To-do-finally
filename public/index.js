const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const btnDelete = '<button class="btnDelete taskBtn">Delete</button>';
const btnEdit = '<button class="btnEdit taskBtn">Edit</button>';
const btnDone = '<button class="btnDone taskBtn">Done</button>';
const btnTimeline = document.getElementById('btnTimeline');
const btnState = document.getElementById('btnState');
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
async function GetReverseItems() {
  taskList.innerHTML = '';
  const response = await fetch('/api/reverse', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok === true) {
    const tasks = await response.json();
    createTasks(tasks);
  }
}
async function GetDoneTasks() {
  taskList.innerHTML = '';
  const response = await fetch('/api/done', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok === true) {
    const tasks = await response.json();
    createTasks(tasks);
  }
}
async function GetUndoneTasks() {
  taskList.innerHTML = '';
  const response = await fetch('/api/undone', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok === true) {
    const tasks = await response.json();
    createTasks(tasks);
  }
}
async function DeleteTask(id) {
  const response = await fetch(`/api/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok === true) {
    GetItems();
  }
}
async function TaskDone(classes, id) {
  let completed = classes.value.includes('complete');
  const response = await fetch(`/api/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ complete: !completed }),
  });
  if (response.ok === true) {
    GetItems();
  }
}
async function TaskEdit(taskText, id) {
  const response = await fetch(`/api/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: taskText }),
  });
  if (response.ok === true) {
    GetItems();
  }
}

const editForm = document.createElement('form');
editForm.setAttribute('onsubmit', 'editText()');
editForm.innerHTML = '<input type="text">';
function editText() {
  event.preventDefault();
  TaskEdit(
    event.currentTarget.childNodes[0].value,
    event.currentTarget.parentElement.getAttribute('data-id')
  );
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
    taskLi.querySelector('.btnDelete').addEventListener('click', (event) => {
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

let stateCounter = 1;
btnState.addEventListener('click', () => {
  stateCounter++;
  switch (stateCounter) {
    case 1:
      btnState.innerText = 'All';
      GetItems();
      break;
    case 2:
      btnState.innerText = 'Done';
      GetDoneTasks();
      break;
    case 3:
      btnState.innerText = 'Undone';
      GetUndoneTasks();
      stateCounter = 0;
      break;
  }
});
let timelineCounter = 1;
btnTimeline.addEventListener('click', () => {
  timelineCounter++;
  switch (timelineCounter) {
    case 1:
      btnTimeline.innerText = 'Normal';
      GetItems()
      break;
    case 2:
      btnTimeline.innerText = 'Reverse';
      GetReverseItems()
      timelineCounter = 0;
      break;
  }
});
