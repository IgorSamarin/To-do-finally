async function TaskDone(classes, id) {
  let completed = classes.value.includes('complete');
  const response = await fetch(`/api/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ complete: !completed }),
  });
  if (response.ok === true) {
    switch (stateCounter) {
      case 1:
        GetItems();
        break;
      case 2:
        GetDoneTasks();
        break;
      case 0:
        GetUndoneTasks();
        break;
    }
  }
}
