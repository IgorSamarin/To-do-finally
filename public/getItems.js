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