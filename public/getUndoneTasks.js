
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