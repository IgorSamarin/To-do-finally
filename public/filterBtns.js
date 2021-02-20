let stateCounter = 1;
btnState.addEventListener('click', () => {
  stateCounter++;
  switch (stateCounter) {
    case 1:
      btnState.innerText = 'All';
      GetItems();
      break;
    case 2:
      btnState.innerText = 'Done';
      GetDoneTasks();
      break;
    case 3:
      btnState.innerText = 'Undone';
      GetUndoneTasks();
      stateCounter = 0;
      break;
  }
});

let timelineCounter = 1;
btnTimeline.addEventListener('click', () => {
  timelineCounter++;
  switch (timelineCounter) {
    case 1:
      btnTimeline.innerText = 'Normal';
      // GetItems();
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
    case 2:
      btnTimeline.innerText = 'Reverse';
      // GetReverseItems();
      switch (stateCounter) {
        case 1:
          GetReverseItems();
          // GetItems();
          break;
        case 2:
          GetReverseDone();
          // GetReverseItemsDone()
          break;
        case 0:
          GetReverseUndone()
          // GetReverseItemsUndone()
          break;
      }
      timelineCounter = 0;
      break;
  }
});
