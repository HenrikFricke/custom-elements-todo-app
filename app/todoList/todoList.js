class HfTodoList extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({mode: 'closed'});
        this.render = this.render.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.render()
    }

    connectedCallback() {
        window.state.subscribe(() => {
            this.removeListener()
            this.renderList()
            this.addListener()
        })
        this.addListener()
    }

    renderItem(item) {
        const i = document.createElement('li')
        i.className = 'hf-todo-list__item'
        i.innerHTML = `
            ${item}
            <button data-item="${item}">Remove</button>
        `
        return i
    }

    addListener() {
        this.shadow.querySelectorAll('button').forEach(button => button.addEventListener('click', this.handleRemove))
    }

    removeListener() {
        this.shadow.querySelectorAll('button').forEach(button => button.removeEventListener('click', this.handleRemove))
    }

    handleRemove(event) {
        window.state.removeTodoItem(event.target.dataset.item)
    }

    renderList() {
        const list = this.shadow.querySelector('ul')
        list.innerHTML = ''
        window.state.getTodoItems().forEach(i => list.appendChild(this.renderItem(i)))
    }
    
    render() {
        this.shadow.innerHTML = `
            <ul class="hf-todo-list"></ul>
            <link rel="stylesheet" href="todoList/todoList.css">
        `
        this.renderList()
    }
}

window.customElements.define('hf-todo-list', HfTodoList);