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
        this.addListener()
    }

    addListener() {
        this.shadow.querySelector('input').addEventListener('change', this.inputChanged)
        this.shadow.querySelector('button').addEventListener('click', this.buttonClicked)
    }

    removeListener() {
        this.shadow.querySelector('input').removeEventListener('change', this.inputChanged)
        this.shadow.querySelector('button').removeEventListener('click', this.buttonClicked)
    }

    resetValue() {
        this.state.value = ''
        this.rerender()
    }

    inputChanged(event) {
        this.state.value = event.target.value
    }

    buttonClicked(event) {
        window.state.addTodoItem(this.state.value)
        this.resetValue()
    }

    rerender() {
        this.removeListener()
        this.renderForm()
        this.addListener()
    }

    renderForm() {
        this.shadow.querySelector('.hf-add-todo').innerHTML = `
            <input class="hf-add-todo__input" type="text" value="${this.state.value}" />
            <button class="hf-add-todo__button">Add</button>
        `
    }

    render() {
        this.shadow.innerHTML = `
            <div class="hf-add-todo"></div>
            <link rel="stylesheet" href="addTodo/addTodo.css">
        `;

        this.renderForm()
    }
}

window.customElements.define('hf-add-todo', HfAddTodo);