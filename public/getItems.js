async function GetItems(chronologyFlag, completeFlag) {
  try {
    taskList.innerHTML = '';
    let queryString = {
      chronology: chronologyFlag,
    };
    if (completeFlag != 'all') queryString.complete = completeFlag;
    const response = await fetch(
      '/api?' + new URLSearchParams( queryString ),
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (response.ok === true) {
      const tasks = await response.json();
      createTasks(tasks);
    }
  } catch (err) {
    console.log(error.message);
  }
}
GetItems(chronologyFlag, completeFlag);
