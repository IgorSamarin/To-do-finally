const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

const btnDelete = '<button class="btnDelete taskBtn">Delete</button>';
const btnEdit = '<button class="btnEdit taskBtn">Edit</button>';
const btnDone = '<button class="btnDone taskBtn">Done</button>';

taskForm.addEventListener('submit', () => {
  event.preventDefault();
  let taskText = event.target.childNodes[1].value;
  addTask(taskText);
});

(async function GetItems() {
  const response = await fetch('/api', {
    method: 'GET',
    headers: { Accept: 'applications/json' },
  });
  if (response.ok === true) {
    const tasks = await response.json();
    createTasks(tasks);
  }
})();

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
  });
};
