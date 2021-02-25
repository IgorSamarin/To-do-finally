const editForm = document.createElement('form');
editForm.setAttribute('onsubmit', 'editText()');
editForm.innerHTML = '<input type="text" autofocus>';
function editText() {
  event.preventDefault();
  TaskEdit(
    event.currentTarget.childNodes[0].value,
    event.currentTarget.parentElement.getAttribute('data-id')
  );
}
async function TaskEdit(taskText, id) {
  const response = await fetch(`/api/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: taskText }),
  });
  if (response.ok === true) {
    checkFilters();
  }
}
