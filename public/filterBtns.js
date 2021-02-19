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
      GetItems()
      break;
    case 2:
      btnTimeline.innerText = 'Reverse';
      GetReverseItems()
      timelineCounter = 0;
      break;
  }
});