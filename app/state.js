class State {
    constructor() {
        this.state = {
            items: []
        }

        this.subscriber = [];
    }

    getTodoItems() {
        return this.state.items
    }

    addTodoItem(item) {
        this.state.items.push(item)
        this.triggerSubscriber()
    }

    removeTodoItem(item) {
        const index = this.state.items.findIndex(i => i === item)
        this.state.items.splice(index, 1)
        this.triggerSubscriber()
    }

    subscribe(listener) {
        this.subscriber.push(listener)
    }

    triggerSubscriber() {
        this.subscriber.forEach((listener) => listener.call())
    }
}

window.state = new State()