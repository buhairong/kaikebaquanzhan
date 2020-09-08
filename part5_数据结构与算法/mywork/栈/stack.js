function Stack() {
    let items = []  // 存储数据

    this.show = function() {
        return items
    }
    // 从栈顶添加元素，也叫压栈
    this.push = function(item) {
        items.push(item)
    }

    // 弹出栈顶元素
    this.pop = function() {
        return items.pop()
    }

    // 返回栈顶元素
    this.top = function() {
        return items[items.length - 1]
    }

    // 判断栈是否为空
    this.isEmpty = function() {
        return items.length === 0
    }

    // 返回栈的大小
    this.size = function() {
        return items.length
    }

    // 清空栈
    this.clear = function() {
        items = []
    }
}

// 判断字符串里的括号是否合法
function is_leagl_brackets(string) {
    let stack = new Stack()
    for (let i = 0; i < string.length; i++) {
        // 遇到左括号入栈
        if(string[i] === '(') {
            stack.push(string[i])
        }else if(string[i] === ')') {
            // 遇到右括号，先判断栈是否为空
            if(stack.isEmpty()) {
                return false
            }else {
                // 弹出栈顶的左括号
                stack.pop()
            }
        }        
    }

    // 如果栈为空，说明字符串括号合法
    return stack.isEmpty()
}

console.log(is_leagl_brackets('sdf(ds(ew(we)rw)rwqq)qwewe'))
console.log(is_leagl_brackets('(sd(qwqw)sd(sd))'))
console.log(is_leagl_brackets('()()sd()(sd()fw))('))


// 计算后缀表达式
function calc(arr) {
    let stack = new Stack()
    let sperator = ['+', '-', '*', '/']
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if(sperator.includes(item)) {
            let num1 = stack.pop()
            let num2 = stack.pop()
            let exp = num2 + item + num1


            let res = parseInt(eval(exp))
            stack.push(res.toString())
        }else {
            stack.push(item)
        }
    }

    return stack.top()
}

console.log(calc(["4", "13", "5", "/", "+"]))
console.log(calc(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]))

// 用2个栈实现一个队列
function StackQueue() {
    let stack1 = new Stack()
    let stack2 = new Stack()
    
}

var sq = new StackQueue();
sq.enqueue(1);
sq.enqueue(4);
sq.enqueue(8);
console.log(sq.head());
sq.dequeue();
sq.enqueue(9);
console.log(sq.head());
sq.dequeue();
console.log(sq.head());
console.log(sq.dequeue());
console.log(sq.dequeue());