/* 
################################################################ 
                      ! RENDER TODO FEATURE
################################################################ 
*/
function createLiElement(todo, params) {
  if (!todo) return;

  const template = document.getElementById('todoTemplate');
  if (!template) return;

  const liElement = template.content.firstElementChild.cloneNode(true);
  liElement.querySelector('.todo__title').textContent = todo.title;
  // liElement.dataset.id = todo.id;
  liElement.dataset.status = todo.status;

  const currentStatus = liElement.dataset.status;

  // ! REMOVE BUTTON
  const removebtn = liElement.querySelector('.remove');
  if (!removebtn) return;

  removebtn.addEventListener('click', () => {
    const todoList = getTodoList();
    const newTodoList = todoList.filter((x) => x.id !== todo.id);
    localStorage.setItem('todo_list', JSON.stringify(newTodoList));
    liElement.remove();
  });

  // ! FINISH / COMPLETED BUTTON
  const markAsDoneBtn = liElement.querySelector('.mark-as-done');
  if (!markAsDoneBtn) return;

  // Div Todo Background Color
  const divElement = liElement.querySelector('.todo');
  const divElementColor = currentStatus === 'pending' ? 'alert-secondary' : 'alert-success';
  divElement.classList.remove('alert-success', 'alert-secondary');
  divElement.classList.add(divElementColor);

  // Mark as Done Button Text
  const markAsDoneBtnText = currentStatus === 'pending' ? 'Finish' : 'Reset';
  markAsDoneBtn.textContent = markAsDoneBtnText;

  // Mark as Done Button Color
  const markAsDoneBtnColor = currentStatus === 'pending' ? 'btn-dark' : 'btn-success';
  markAsDoneBtn.classList.add(markAsDoneBtnColor);

  // check if we should show it or not
  liElement.hidden = !isMatch(liElement, params);

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

function renderElements(todoList, params) {
  const ulElement = document.getElementById('todoList');
  if (!ulElement) return;

  for (todo of todoList) {
    const liElement = createLiElement(todo, params);
    ulElement.append(liElement);
  }
}

/* 
################################################################ 
                      ! ADD TODO FEATURE
################################################################ 
*/
function handleTodoFormSubmit(event) {
  event.preventDefault();

  const todoForm = document.getElementById('todoFormId');
  const todoInput = todoForm.querySelector('#todoText');
  if (!todoInput) return;

  // create new todo
  const newTodo = {
    id: Date.now(),
    title: todoInput.value,
    status: 'pending',
  };

  // add new todo to todoList on local storage
  const todoList = getTodoList();
  todoList.push(newTodo);
  localStorage.setItem('todo_list', JSON.stringify(todoList));

  // update todo elements on browser
  const newLiElement = createLiElement(newTodo);
  const ulElement = document.getElementById('todoList');
  ulElement.append(newLiElement);

  todoInput.value = '';
}

/* 
################################################################ 
                      ! SEARCH FEATURE
################################################################ 
*/

// * Lấy ra giá trị title của từng todo
// * So sánh với keyword và trả về true or false
// function isMatch(liElement, searchTerm) {
//   if (!liElement) return false;
//   if (searchTerm === '') return true;

//   const titleElement = liElement.querySelector('p.todo__title');
//   if (!titleElement) return false;

//   return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
// }

// * Lấy toàn bộ các thẻ li todo có trên trình duyệt
function getAllTodoElement() {
  return document.querySelectorAll('#todoList > li');
}

// * Duyệt qua từng li todo
// * Truyền li và keyword cho hàm isMatch
// * Ẩn hiện todo tương ứng với keyword
// function searchTodo(searchTerm) {
//   const todoElementList = getAllTodoElement();

//   for (const todoElement of todoElementList) {
//     const needToShow = isMatch(todoElement, searchTerm);
//     todoElement.hidden = !needToShow;
//   }
//   // searchTerm === empty --> show all
//   // searchTerm !== empty --> filter todo
// }

// * Lấy giá trị trong ô input truyền cho hàm searchTodo
// function initSearchInput() {
//   // find search term input
//   const searchInput = document.getElementById('searchTerm');
//   if (!searchInput) return;

//   searchInput.addEventListener('input', (e) => {
//     searchTodo(searchInput.value);
//   });
// }

/* 
################################################################ 
                      ! FILTER STATUS FEATURE
################################################################ 
*/
// so sánh giá trị status người dùng nhập và giá trị status mặc định
// function isMatch(status, liElement) {
//   if (!liElement) return false;
//   if (status === 'all') return true;

//   const currentLiElementStatus = liElement.dataset.status;
//   return currentLiElementStatus === status;
// }

// * Lấy toàn bộ các thẻ li todo có trên trình duyệt
// function getAllTodoElement() {
//   return document.querySelectorAll('#todoList > li');
// }

// * Lây vào giá trị status và các thẻ li todo hiện có
// * Duyệt qua từng thẻ li -> truyền status và li todo cho hàm isMatch
// * Tuỳ vào giá trị isMatch trả về mà ẩn hiện element
// function filterTodo(status) {
//   if (!status) return;

//   const liElementList = getAllTodoElement();
//   for (const liElement of liElementList) {
//     const isShow = isMatch(status, liElement);
//     liElement.hidden = !isShow;
//   }
// }

// * Lấy giá trị select mà người dùng đã thay đổi -> truyền nó cho hàm filterTodo
// function initFilterInput() {
//   const filterInput = document.getElementById('filterStatus');
//   if (!filterInput) return;

//   filterInput.addEventListener('change', () => {
//     filterTodo(filterInput.value);
//   });
// }

/* 
################################################################ 
                      ! PERSIST FILTERS
################################################################ 
*/
// On filter change
// Update query params using history.pushState
// Retrieve the latest query params
// Loop through li element list
// isMatch -> yes => show it, no => hidden it

// * Nhận giá trị từ input status và search để thay đổi query params
function handleFilterChange(filterName, filterValue) {
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);

  // cập nhật params từ giá trị người dùng nhập
  history.pushState({}, '', url);

  // ẩn hiện liElement tuỳ vào giá trị isMatch
  const liElementList = getAllTodoElement();
  for (const liElement of liElementList) {
    const isShow = isMatch(liElement, url.searchParams);
    liElement.hidden = !isShow;
  }
}

// * Kiểm tra có thoả cả 2 điều kiện status và search
function isMatch(liElement, params) {
  return (
    isMatchSearch(liElement, params.get('searchTerm')) &&
    isMatchStatus(liElement, params.get('status'))
  );
}

// * Kiểm tra có thoả điều kiện status
function isMatchStatus(liElement, filterStatus) {
  return filterStatus === 'all' || liElement.dataset.status === filterStatus;
}

// * Kiểm tra có thoả điều kiện search
function isMatchSearch(liElement, searchTerm) {
  if (!liElement) return false;
  if (searchTerm === '') return true;

  const titleElement = liElement.querySelector('p.todo__title');
  if (!titleElement) return false;

  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

// * Nhận giá trị input status truyền cho hàm handleFilterChange
function initFilterInput(params) {
  const filterInput = document.getElementById('filterStatus');
  if (!filterInput) return;

  if (params.get('status')) {
    filterInput.value = params.get('status');
  }

  filterInput.addEventListener('change', () => {
    handleFilterChange('status', filterInput.value);
  });
}

// * Nhận giá trị input search truyền cho hàm handleFilterChange
function initSearchInput(params) {
  // find search term input
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;

  if (params.get('searchTerm')) {
    searchInput.value = params.get('searchTerm');
  }

  searchInput.addEventListener('input', () => {
    handleFilterChange('searchTerm', searchInput.value);
  });
}

/* 
################################################################ 
                      ! MAIN FUNCTION
################################################################ 
*/
function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem('todo_list')) || [];
  } catch {
    return [];
  }
}

(() => {
  //   const initTodoList = [
  //     { id: 1, title: "JavaScript", status: "pending" },
  //     { id: 2, title: "TypeScript", status: "completed" },
  //     { id: 3, title: "ReactJS", status: "pending" },
  //     { id: 4, title: "NextJS", status: "completed" },
  //   ];
  // localStorage.setItem('todo_list', JSON.stringify(initTodoList));

  const todoList = getTodoList();
  if (!todoList) return;

  const todoForm = document.getElementById('todoFormId');
  if (todoForm) {
    todoForm.addEventListener('submit', handleTodoFormSubmit);
  }

  // get query params object
  const params = new URLSearchParams(window.location.search);
  renderElements(todoList, params);

  initSearchInput(params);
  initFilterInput(params);
})();
