// form
var form = document.getElementById('form');
var todoList = document.getElementById('todo-list');
var todoData = localStorage.getItem('todoStorage') ? JSON.parse(localStorage.getItem('todoStorage')) : [];

// functions
var loopTodo = function() {
  todoList.innerHTML = "";

  todoData.forEach(element => {
    var li = document.createElement('li');
    li.classList.add('collection-item');
    li.appendChild(document.createTextNode(element));

    // Add new todo to dom
    todoList.appendChild(li)
  });
}
  
loopTodo();

// event listener when submitting form
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get value from input
  var todo = document.getElementById('todo-item');
  todoData.push(todo.value);

  // Save data to the current local store
  localStorage.setItem('todoStorage', JSON.stringify(todoData));

  // Append li
  loopTodo();

  // Clear input field
  todo.value = '';
})