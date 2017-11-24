class State {
    constructor() {
        this.state = {
            items: []
        }

        this.subscriber = []

        this.loadFromStorage()
    }

    getTodoItems() {
        return this.state.items
    }

    addTodoItem(item) {
        this.state.items.push(item)
        this.update()
    }

    removeTodoItem(item) {
        const index = this.state.items.findIndex(i => i === item)
        this.state.items.splice(index, 1)
        this.update()
    }

    update() {
        this.triggerSubscriber()
        this.persist()
    }

    subscribe(listener) {
        this.subscriber.push(listener)
    }

    triggerSubscriber() {
        this.subscriber.forEach((listener) => listener.call())
    }

    loadFromStorage() {
        const storage = window.localStorage.getItem('state')

        if (storage) {
            this.state = JSON.parse(storage)
            this.update()
        }
    }

    persist() {
        window.localStorage.setItem('state', JSON.stringify(this.state))
    }
}

window.state = new State()