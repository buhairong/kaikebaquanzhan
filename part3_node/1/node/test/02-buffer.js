const buf1 = Buffer.alloc(10)  // alloc 分配一片内存区域，这里分配 10字节 内存区域
console.log('buf1', buf1)

const buf2 = Buffer.from('a')
console.log('buf2', buf2)

const buf3 = Buffer.from('中文')
console.log('buf3', buf3, buf3.toString())

const buf4 = Buffer.concat([buf2, buf3])
console.log('buf4', buf4, buf4.toString())