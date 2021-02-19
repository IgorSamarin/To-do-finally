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