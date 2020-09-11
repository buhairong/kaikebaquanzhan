function BitMap(){
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
        
        if(result) {
            return true
        }

        return false
    };
}


// 排序
var arr = [0, 6, 88, 7, 73, 34, 10, 99, 22];
var sort_arr = [];
var bit_map = new BitMap();

for(let i = 0;i < arr.length;i++){
    bit_map.addMember(arr[i]);
}

for(let i = 0;i <= 99;i++){
    if(bit_map.isExist(i)){
        sort_arr.push(i);
    }
}

console.log(sort_arr);