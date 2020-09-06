class Math {
    add(a, b) {
        console.log(a+b)
        return a + b
    }
}

function log(target, name, descriptor) {
    var oldValue = descriptor.value 
    descriptor.value = function() {
        return oldValue.apply(null, arguments)
    }

    return descriptor
}

const math = new Math()
math.add(2, 4)


let arr = [1, 2, 3]
console.log(arr)
arr.length = 0
console.log(arr)