const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');

let todos = [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.textContent = todo;
        todoItem.setAttribute('draggable', true);
        todoItem.dataset.index = index;

        todoItem.addEventListener('dragstart', handleDragStart);
        todoItem.addEventListener('dragover', handleDragOver);
        todoItem.addEventListener('drop', handleDrop);

        todoList.appendChild(todoItem);
    });
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.index);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData('text/plain');
    const toIndex = e.target.dataset.index;

    if (fromIndex !== toIndex) {
        const movedTodo = todos.splice(fromIndex, 1)[0];
        todos.splice(toIndex, 0, movedTodo);
        renderTodos();
    }
}

addButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push(todoText);
        todoInput.value = '';
        renderTodos();
    }
});

renderTodos();