async function GetItems(chronologyFlag, completeFlag) {
  taskList.innerHTML = '';
  const response = await fetch(
    '/api?' +
      new URLSearchParams({
        chronology: chronologyFlag,
        complete: completeFlag,
      }),
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (response.ok === true) {
    const tasks = await response.json();
    createTasks(tasks);
  }
}
GetItems(chronologyFlag, completeFlag);
