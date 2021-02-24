taskForm.addEventListener('submit', () => {
    event.preventDefault();
    let taskText = event.target.childNodes[1].value;
    let textArr = taskText.trim().split(' ');
    if (textArr != '') {
      AddTask(taskText);
      taskForm.reset();
    }
  });
  async function AddTask(taskText) {
    let reqBody = { text: taskText };
    const response = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify(reqBody),
    });
    if (response.ok === true) {
      const task = await response.json();
      switch (timelineCounter) {
        case 1:
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
          break;
        case 0:
          switch (stateCounter) {
            case 1:
              GetReverseItems();
              break;
            case 2:
              GetReverseDone();
              break;
            case 0:
              GetReverseUndone()
              break;
          }
          timelineCounter = 0;
          break;
      }
    }
  }