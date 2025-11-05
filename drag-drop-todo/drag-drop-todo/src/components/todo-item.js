class TodoItem {
    constructor(text) {
        this.text = text;
        this.element = this.createElement();
    }

    createElement() {
        const item = document.createElement('div');
        item.className = 'todo-item';
        item.draggable = true;
        item.innerText = this.text;

        item.addEventListener('dragstart', this.handleDragStart.bind(this));
        item.addEventListener('dragend', this.handleDragEnd.bind(this));

        return item;
    }

    handleDragStart(event) {
        event.dataTransfer.setData('text/plain', this.text);
        this.element.classList.add('dragging');
    }

    handleDragEnd() {
        this.element.classList.remove('dragging');
    }

    render(parent) {
        parent.appendChild(this.element);
    }
}

export default TodoItem;