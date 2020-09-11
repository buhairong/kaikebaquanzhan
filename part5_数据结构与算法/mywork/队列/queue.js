function Queue() {
    let items = []  // 存储数据

    this.show = function() {
        return items
    }
    // 队列尾部加元素
    this.enqueue = function(item) {
        items.push(item)
    }

    // 移除队列头部的元素
    this.dequeue = function() {
        return items.shift()
    }

    // 返回队列头部元素
    this.head = function() {
        return items[0]
    }

    // 返回队列尾部元素
    this.tail = function() {
        return items[items.length - 1]
    }

    // 判断队列是否为空
    this.isEmpty = function() {
        return items.length === 0
    }

    // 返回队列的大小
    this.size = function() {
        return items.length
    }

    // 清空队列
    this.clear = function() {
        items = []
    }
}


// 约瑟夫环 每隔2个数删除一个数，到末尾时循环至开头继续进行，求最后一个被删掉的数
function del_ring(len) {
    let queue = new Queue()
    for (let i = 0; i < len; i++) {
        queue.enqueue(i)    
    }

    let index = 0
    while(queue.size() != 1) {
        let item = queue.dequeue()
        index += 1
        if(index % 3 != 0) {
            queue.enqueue(item)
        }
    }

    console.log(queue.show())
    return queue.head()
}

console.log(del_ring(100))

// 斐波那契数列  斐波那契数列的前2项是 1 1，此后的每一项都是前2项之和，fn=fn(n-1)+fn(n-2)
function fibonacci(n) {
    let queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(1)

    let index = 0
    while(index < n-2) {        
        // 第一个元素出队列
        let delItem = queue.dequeue()
        // 取出队列头部元素
        let headItem = queue.head()
        // 计算下一项的值
        let nextItem = delItem + headItem
        // 将计算结果放入队列
        queue.enqueue(nextItem)

        index++
    }

    return queue.tail()
}

console.log(fibonacci(8))

// 用2个队列实现栈
function QueueStack() {
    let queue1 = new Queue()
    let queue2 = new Queue()
    let data_queue = null  // 放数据的队列
    let empty_queue = null // 空队列，备份使用

    // 确认哪个队列放数据，哪个队列做备份空队列
    let init_queue = function() {
        // 都为空，默认返回queue1
        if(queue1.isEmpty() && queue2.isEmpty()) {
            data_queue = queue1
            empty_queue = queue2
        }else if(queue1.isEmpty()) {
            data_queue = queue2
            empty_queue = queue1
        }else {
            data_queue = queue1
            empty_queue = queue2
        }
    }

    // push方法
    this.push = function(item) {
        init_queue()
        data_queue.enqueue(item)
    }

    // top方法
    this.top = function() {
        init_queue()
        console.log(data_queue.show())
        return data_queue.tail()
    }

    /*
        pop方法
        pop方法要弹出栈顶元素，这个栈顶元素，其实就是queue的队尾元素
        但是队尾元素是不能删除的，
    */
    this.pop = function() {
        init_queue()
        while(data_queue.size() > 1) {
            empty_queue.enqueue(data_queue.dequeue())
        }
        return data_queue.dequeue()
    }
}

var q_stack = new QueueStack();
q_stack.push(1);
q_stack.push(2);
q_stack.push(4);
console.log(q_stack.top());



// 打印杨辉三角 使用队列打印出杨辉三角的前n行，n>=1
function yanghui(n) {
    let queue = new Queue()
    queue.enqueue(1)
    for (let i = 1; i < n; i++) {
        let pre = 0
        let line = ''       
        for (let j = 0; j < i; j++) {
            let item = queue.dequeue()
            line += item + ' '
            let value = pre + item
            pre = item   
            queue.enqueue(value)         
        }
        queue.enqueue(1)
        console.log(line)
    }
}

yanghui(10)