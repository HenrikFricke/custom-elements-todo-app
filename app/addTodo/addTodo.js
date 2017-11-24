class HfAddTodo extends HTMLElement {
    constructor() {
        super();

        this.state = {
            value: '',
        }

        this.shadow = this.attachShadow({mode: 'closed'});
        this.render();

        this.inputChanged = this.inputChanged.bind(this)
        this.buttonClicked = this.buttonClicked.bind(this)
    }
    
    connectedCallback() {
        this.shadow.querySelector('input').addEventListener('change', this.inputChanged)
        this.shadow.querySelector('button').addEventListener('click', this.buttonClicked)
    }

    resetValue() {
        this.state.value = ''
        this.render()
    }

    inputChanged(event) {
        this.state.value = event.target.value
    }

    buttonClicked(event) {
        window.state.addTodoItem(this.state.value)
    }

    render() {
        this.shadow.innerHTML = `
            <div class="hd-add-todo">
                <input class="hd-add-todo__input" type="text" value="${this.state.value}" />
                <button class="hd-add-todo__button">Add</button>
            </div>
            <link rel="stylesheet" href="addTodo/addTodo.css">
        `;
    }
}

window.customElements.define('hf-add-todo', HfAddTodo);