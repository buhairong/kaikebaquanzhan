const {EventEmitter} = require('events')

// 冒泡排序
module.exports = class Connection {
    constructor() {
        this.emmiter = new EventEmitter()        
    }

    onConn(cb) {
        this.emmiter.on('con', (msg) => {
            console.log(msg)
        })
    }
    
    connection(msg) {
        this.emmiter.emit('con', msg)
    }
}
