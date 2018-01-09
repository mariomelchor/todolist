// form
var form = document.getElementById('form')
var todoList = document.getElementById('todo-list')
var todoData = localStorage.getItem('todoStorage') ? JSON.parse(localStorage.getItem('todoStorage')) : []

// functions
var loopTodo = function () {
  todoList.innerHTML = ''
  todoData.forEach(createItem)
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

  trashIcon.classList.add('material-icons')
  trashIcon.classList.add('btn-delete-todo')
  trashIcon.classList.add('right')
  trashIcon.setAttribute('data-id', index)
  trashIcon.textContent = 'delete'

  li.classList.add('collection-item')
  li.setAttribute('data-id', index)
  li.appendChild(checkbox)
  li.appendChild(label)
  li.appendChild(trashIcon)

  // Add new todo to dom
  todoList.appendChild(li)
}

loopTodo()

// event listener when submitting form
form.addEventListener('submit', function (e) {
  e.preventDefault()

  // Get value from input
  var todo = document.getElementById('todo-item')
  todoData.push(todo.value)

  // Save data to the current local store
  localStorage.setItem('todoStorage', JSON.stringify(todoData))

  // Append li
  loopTodo()

  // Clear input field
  todo.value = ''
})


// Click event for dynamic trash elements
document.addEventListener('click', function (event) {
  if ( event.target.classList.contains( 'btn-delete-todo' ) ) {
    id = event.target.getAttribute('data-id')
    deleteTodo(id)
  }  
}, false)

var deleteTodo = function(id) {

  todoData.splice(id, 1);
  
  // Save data to the current local store
  localStorage.setItem('todoStorage', JSON.stringify(todoData))

  loopTodo()

}