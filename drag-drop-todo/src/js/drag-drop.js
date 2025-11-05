function enableDragAndDrop() {
    const todoList = document.getElementById('todo-list');
    let draggedItem = null;

    todoList.addEventListener('dragstart', (event) => {
        draggedItem = event.target;
        event.target.style.opacity = 0.5;
    });

    todoList.addEventListener('dragend', (event) => {
        event.target.style.opacity = '';
    });

    todoList.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    todoList.addEventListener('drop', (event) => {
        event.preventDefault();
        if (event.target.classList.contains('todo-item')) {
            todoList.insertBefore(draggedItem, event.target.nextSibling);
        }
    });
}

export { enableDragAndDrop };