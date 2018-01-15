// form
var form = document.getElementById('form')
var todoList = document.getElementById('todo-list')
var completedList = document.getElementById('completed-list')
var obj = { todo: [], completed: [] }
var todoData = localStorage.getItem('todoStorage') ? JSON.parse(localStorage.getItem('todoStorage')) : obj

// functions
var loopTodo = function () {
  todoList.innerHTML = ''
  todoData.todo.forEach(createItem)
}

var createItem = function (element, index, array) {
  var li = document.createElement('li')
  var trashIcon = document.createElement('i')
  var checkbox = document.createElement('input')
  var label = document.createElement('label')

  label.setAttribute('for', 'checkbox-' + index)
  label.innerText = element

  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('id', 'checkbox-' + index)
  checkbox.setAttribute('name', 'checkbox')
  checkbox.setAttribute('data-id', index)

  trashIcon.classList.add('material-icons')
  trashIcon.classList.add('btn-delete-todo')
  trashIcon.classList.add('right')
  trashIcon.setAttribute('data-id', index)
  trashIcon.textContent = 'delete'

  li.classList.add('collection-item')
  li.appendChild(checkbox)
  li.appendChild(label)
  li.appendChild(trashIcon)

  // Add new todo to dom
  todoList.appendChild(li)
}

loopTodo()

// functions
var loopCompleted = function () {
  completedList.innerHTML = ''
  todoData.completed.forEach(createCompleted)
}

var createCompleted = function (element, index, array) {
  var li = document.createElement('li')
  var trashIcon = document.createElement('i')
  var checkbox = document.createElement('input')
  var label = document.createElement('label')

  label.setAttribute('for', 'checkbox-' + index)
  label.innerText = element

  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('id', 'checkbox-' + index)
  checkbox.setAttribute('name', 'checkbox')
  checkbox.setAttribute('data-id', index)
  checkbox.setAttribute('checked', 'checked')

  trashIcon.classList.add('material-icons')
  trashIcon.classList.add('btn-delete-todo')
  trashIcon.classList.add('right')
  trashIcon.setAttribute('data-id', index)
  trashIcon.textContent = 'delete'

  li.classList.add('collection-item')
  li.appendChild(checkbox)
  li.appendChild(label)
  li.appendChild(trashIcon)

  // Add new todo to dom
  completedList.appendChild(li)
}

loopCompleted()

// event listener when submitting form
form.addEventListener('submit', function (e) {
  e.preventDefault()

  // Get value from input
  var todo = document.getElementById('todo-item')

  if ( todo.value !== '' ) {
    todoData.todo.push(todo.value)
    
    // Save data to the current local store
    localStorage.setItem('todoStorage', JSON.stringify(todoData))

    // Append li
    loopTodo()

    // Clear input field
    todo.value = ''
  }

}) 

// Click event for dynamic trash elements
document.addEventListener('click', function (event) {
  if ( event.target.classList.contains( 'btn-delete-todo' ) ) {
    id = event.target.getAttribute('data-id')
    deleteTodo(id)
  }  
}, false)

var deleteTodo = function(id) {
  // Remove from array
  todoData.todo.splice(id, 1);
  
  // Save data to the current local store
  localStorage.setItem('todoStorage', JSON.stringify(todoData))

  loopTodo()
}

// Click event for dynamic trash elements
document.addEventListener('click', function (event) {
  if ( event.target.type === 'checkbox' ) {
    var element = event.target
    var id = event.target.getAttribute('data-id')
    console.log(element.checked)

    if(element.checked){
      completeTodo(id)
    } else {
      unCompleteTodo(id)
    }

  }  
}, false)

var completeTodo = function(id){

  // Add to completed
  todoData.completed.push(todoData.todo[id]);

  // Remove from array
  todoData.todo.splice(id, 1);
  
  // Save data to the current local store
  localStorage.setItem('todoStorage', JSON.stringify(todoData))
  
  loopTodo()
  loopCompleted()
}

var unCompleteTodo = function(id){

  // Add to completed
  todoData.todo.push(todoData.completed[id]);

  // Remove from array
  todoData.completed.splice(id, 1);

  // Save data to the current local store
  localStorage.setItem('todoStorage', JSON.stringify(todoData))
  
  loopTodo()
  loopCompleted()
}