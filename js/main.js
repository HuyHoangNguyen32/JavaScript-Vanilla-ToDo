function createLiElement(todo) {
  if (!todo) return;

  const template = document.getElementById('todoTemplate');
  if (!template) return;

  const liElement = template.content.firstElementChild.cloneNode(true);
  liElement.querySelector('.todo__title').textContent = todo.title;
  // liElement.dataset.id = todo.id;
  liElement.dataset.status = todo.status;

  const currentStatus = liElement.dataset.status;

  // ! FINISH / COMPLETED BUTTON
  const markAsDoneBtn = liElement.querySelector('.mark-as-done');
  if (!markAsDoneBtn) return;

  // Div Todo Background Color
  const divElement = liElement.querySelector('.todo');
  const divElementColor = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
  divElement.classList.remove('alert-success', 'alert-secondary');
  divElement.classList.add(divElementColor);

  // Mark as Done Button Text
  const markAsDoneBtnText = currentStatus === 'pending' ? 'Reset' : 'Finish';
  markAsDoneBtn.textContent = markAsDoneBtnText;

  // Mark as Done Button Color
  const markAsDoneBtnColor = currentStatus === 'pending' ? 'btn-success' : 'btn-dark';
  markAsDoneBtn.classList.add(markAsDoneBtnColor);

  markAsDoneBtn.addEventListener('click', () => {
    // ! why
    const currentStatus = liElement.dataset.status;
    // toggle status
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    liElement.dataset.status = newStatus;
    //toggle background color
    const divElementColor = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
    divElement.classList.remove('alert-success', 'alert-secondary');
    divElement.classList.add(divElementColor);
    // toggle button text
    const markAsDoneBtnText = currentStatus === 'pending' ? 'Reset' : 'Finish';
    markAsDoneBtn.textContent = markAsDoneBtnText;
    // toggle button color
    const markAsDoneBtnColor = currentStatus === 'pending' ? 'btn-success' : 'btn-dark';
    markAsDoneBtn.classList.remove('btn-dark', 'btn-success');
    markAsDoneBtn.classList.add(markAsDoneBtnColor);
    // update status of todo on local storage
    const todoList = getTodoList();
    const index = todoList.findIndex((x) => x.id === todo.id);
    todoList[index].status = newStatus;
    localStorage.setItem('todo_list', JSON.stringify(todoList));
  });

  return liElement;
}

function renderElements(todoList) {
  const ulElement = document.getElementById('todoList');
  if (!ulElement) return;

  for (todo of todoList) {
    const liElement = createLiElement(todo);
    ulElement.append(liElement);
  }
}

function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem('todo_list')) || [];
  } catch {
    return [];
  }
}

(() => {
  const todoList = getTodoList();
  if (!todoList) return;

  renderElements(todoList);
})();
