export default class Bus {
    constructor() {
        this.events = {}
    }

    on(event, fn) {
        this.events[event] = this.events[event] || []
        this.events[event].push(fn)
    }

    emit(event, args) {
        if(this.events[event]) {
            this.events[event].forEach(cb => cb(args));
        }
    }    
}