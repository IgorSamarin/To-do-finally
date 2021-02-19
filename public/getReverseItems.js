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