function FindClass(){
    var datas = []; //存储数据

    // 先都初始化为0
    for (let i = 0; i <= 100; i++) {
        datas[i] = 0        
    }

    // 加⼊入⼀一个整数 member
    this.addMember = function(member){
        datas[member] = 1
    };

    // 判断member是否存在
    this.isExist = function(member){
        if(datas[member] === 1) {
            return true
        }
        return false
    };
}

var fc = new FindClass();
var arr = [0, 3, 5, 6, 9, 34, 23, 78, 99];

for(var i = 0;i < arr.length;i++){
    fc.addMember(arr[i]);
}

console.log(fc.isExist(3));
console.log(fc.isExist(7));
console.log(fc.isExist(78));