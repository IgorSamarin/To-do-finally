async function GetItems(filters) {
  try {
    taskList.innerHTML = '';
    let queryString = {
      chronology: filters.order,
    };
    if (filters.completeness != 'all')
      queryString.complete = filters.completeness;
    const response = await fetch('/api?' + new URLSearchParams(queryString), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok === true) {
      const tasks = await response.json();
      createTasks(tasks);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
}
