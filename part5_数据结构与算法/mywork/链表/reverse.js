// 使用迭代和递归两种方法实现翻转链表

var Node = function(data){
    this.data = data;
    this.next = null;
}

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);
var node6 = new Node(6);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node6;

function print(node){
    var curr_node = node;
    while(curr_node){
        console.log(curr_node.data);
        curr_node = curr_node.next;
    }
};

// 迭代翻转
function reverse_iter(head){
    if(!head) {
        return
    }
    let cur_node = head
    let pre_node = null
    let next_node
    while(cur_node) {
        next_node = cur_node.next    // 下一个节点
        cur_node.next = pre_node     // 当前要翻转的节点
        pre_node = cur_node          // pre_node向后滑动
        cur_node = next_node         // cur_node向后滑动
    }

    // 当循环结束后，pre_node指向翻转前链表的最后一个节点
    return pre_node
}


//print(reverse_iter(node1))
console.log('--------------------------------------')

// 递归翻转
function reverse_digui(head){
    if(!head) {
        return
    }

    if(head.next == null) {
        return head
    }

    console.log('head', head);

    let new_head = reverse_digui(head.next)

    console.log('head1', head);

    head.next.next = head
    head.next = null

    return new_head
}

//print(reverse_digui(node1))



// 从尾到头打印链表，不许翻转链表
function reverse_print(head) {
    if(head == null) {
        return
    }else {
        reverse_print(head.next)
        console.log(head.data)
    }
}

//reverse_print(node1)

function reverse_find(head, k) {
    let fast = head
    let slow = head
    let step = k

    while(step > 0 && fast) {
        fast = fast.next
        step--
    }

    // 当链表走完时，step还大于0，说明k大于链表的长度
    if(step > 0) {
        return
    }else {
        while(fast && slow) {
            fast = fast.next
            slow = slow.next
        }

        return slow.data
    }
}

//console.log(reverse_find(node1, 2))

// 查找链表中间节点
function find_middle(head) {
    let fast = head
    let slow = head

    while(fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }

    return slow.data
}

console.log(find_middle(node1))