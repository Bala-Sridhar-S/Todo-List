const form = document.querySelector('.input-form')
const input = document.querySelector('#inp-text')
const submitBtn = document.querySelector('#submit')
const alert = document.querySelector('.alert')
const select = document.querySelector('#cat')
const ul = document.querySelector('#list-ul')
const todoTitle = document.querySelector('#todo-title')
const doneBtn = document.querySelector('#done')
const deleteBtn = document.querySelector('#delete')

// Getting the todos from the localStorage or initialising it to an empty array
let todos = JSON.parse(localStorage.getItem('todos')) || []

// Functions for various tasks
const listItems = (todos) => {
    ul.innerHTML = todos.map(todo => (
        `<li class="${ todo.completed ? "todo flex completed" : "todo flex" }">
            <p id="todo-title">${ todo.name }</p>
            <i class="fas fa-check" onClick="completeTodo(${ todo.id })"></i>
            <i class="fas fa-trash-alt" onClick="deleteTodo(${ todo.id })"></i>
        </li>`
    )).join('')
}

const handleSubmit = (e) => {
    e.preventDefault()
    const name = input.value

    if(name !== ''){
        let item = {
            name,
            id: Date.now(),
            completed: false
        }
        input.value = ''
        alert.classList.remove('alert-display')
        todos.push(item)
        localStorage.setItem('todos', JSON.stringify(todos))
        select.value = 'all'
        filterTodos(select.value)
    } else {
        alert.classList.add('alert-display')
    }
}

const completeTodo = (id) => {
    todos.map(todo => {
        if(todo.id === id){
            console.log(todo.id);
            todo.completed = true
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    filterTodos(select.value)
}

const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    todos = newTodos
    localStorage.setItem('todos', JSON.stringify(todos))
    filterTodos(select.value)
}

const completedItems = () => {
    newTodos = todos.filter(todo => todo.completed === true)
    listItems(newTodos)
} 

const uncompletedItems = () => {
    newTodos = todos.filter(todo => todo.completed === false)
    listItems(newTodos)
} 

const filterTodos = (value) => {
    console.log(value);
    if(value === 'all'){
        listItems(todos)
    } else if(value === 'completed'){
        completedItems()
    } else if(value === 'uncompleted'){
        uncompletedItems()
    }
}

// Event Listeners

// Populating the initial list
listItems(todos)

// Submitting the form
form.addEventListener('submit', handleSubmit)

select.addEventListener('change', () => filterTodos(select.value))


