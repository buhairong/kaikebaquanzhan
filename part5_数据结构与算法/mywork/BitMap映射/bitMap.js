function FindClass(){
    var datas = []; //存储数据

    // 加⼊入⼀一个整数 member
    this.addMember = function(member){
        let arr_index = Math.floor(member/32)   // 决定在数组中的索引位置
        let bit_index = member%32  // 决定在32位bit位中的哪一位

        datas[arr_index] = datas[arr_index] | 1 << bit_index
    };

    // 判断member是否存在
    this.isExist = function(member){
        let arr_index = Math.floor(member/32)   // 决定在数组中的索引位置
        let bit_index = member%32  // 决定在32位bit位中的哪一位

        let result = datas[arr_index] & 1 << bit_index
        console.log(result)
        if(result) {
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


