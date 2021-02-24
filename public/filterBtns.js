let stateCounter = 1;
let completeFlag = 'all';
btnState.addEventListener('click', () => {
  stateCounter++;
  switch (stateCounter) {
    case 1:
      btnState.innerText = 'All';
      completeFlag = 'all';
      break;
    case 2:
      btnState.innerText = 'Done';
      completeFlag = 'true';
      break;
    case 3:
      btnState.innerText = 'Undone';
      completeFlag = 'false';
      stateCounter = 0;
      break;
  }
  GetItems(chronologyFlag, completeFlag);
});

let timelineCounter = 1;
let chronologyFlag = 'normal';
btnTimeline.addEventListener('click', () => {
  timelineCounter++;

  switch (timelineCounter) {
    case 1:
      btnTimeline.innerText = 'Normal';
      chronologyFlag = 'normal';
      break;
    case 2:
      btnTimeline.innerText = 'Reverse';
      chronologyFlag = 'reverse';
      timelineCounter = 0;
      break;
  }
  GetItems(chronologyFlag, completeFlag);
});
