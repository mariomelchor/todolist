// form
var form = document.getElementById('form')
var todoList = document.getElementById('todo-list')
var todoData = localStorage.getItem('todoStorage') ? JSON.parse(localStorage.getItem('todoStorage')) : []

// functions
var loopTodo = function () {
  todoList.innerHTML = ''

  todoData.forEach(element => {
    var li = document.createElement('li')
    var anchor = document.createElement('a')
    var trashIcon = document.createElement('i')
    var checkbox = document.createElement('input')
    var label = document.createElement('label')

    label.setAttribute('for', 'checkbox')
    label.innerText = element

    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', 'checkbox')
    checkbox.setAttribute('name', 'checkbox')

    trashIcon.classList.add('material-icons')
    trashIcon.textContent = 'delete'

    anchor.appendChild(trashIcon)
    anchor.classList.add('right')
    anchor.setAttribute('href', '#')

    li.classList.add('collection-item')
    li.appendChild(checkbox)
    li.appendChild(label)
    li.appendChild(anchor)

    // Add new todo to dom

    todoList.appendChild(li)
  })
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
