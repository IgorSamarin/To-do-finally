
async function DeleteTask(id) {
  const response = await fetch(`/api/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok === true) {
    
    setTimeout(() => {
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
    }, 200);
  }
}
