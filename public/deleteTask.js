
async function DeleteTask(id) {
  const response = await fetch(`/api/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok === true) {
    
    setTimeout(() => {
      GetItems(chronologyFlag, completeFlag)

    }, 200);
  }
}
