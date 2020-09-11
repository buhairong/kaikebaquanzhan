var Node = function(data){
    this.data = data;
    this.next = null;
}

var node1 = new Node(1);
var node2 = new Node(4);
var node3 = new Node(9);
var node4 = new Node(2);
var node5 = new Node(5);
var node6 = new Node(6);
var node7 = new Node(10);
var node8 = new Node(11);
var node9 = new Node(12);

// 链表1
node1.next = node2;
node2.next = node3;


// 链表2
node4.next = node5;
node5.next = node6;
node6.next = node7;
node7.next = node8;
node8.next = node9;

function merge_link(head1, head2){
    //在这⾥里里实现你的代码
    if(head1 == null) {
        return head2
    }

    if(head2 == null) {
        return head1
    }

    let cur1 = head1
    let cur2 = head2
    let head = null
    let tail = null    
    
    while(cur1 && cur2) {
        let min_data
        if(cur1.data < cur2.data) {
            min_data = cur1.data
            cur1 = cur1.next
        }else{
            min_data = cur2.data
            cur2 = cur2.next
        }

        if(head == null) {
            head = new Node(min_data)
            tail = head
        }else {
            let new_node = new Node(min_data)
            tail.next = new_node
            tail = new_node
        }
    }

    if(cur1) {
        tail.next = cur1
    }else {
        tail.next = cur2
    }

    return head
};

print(merge_link(node1, node4));

function print(node){
    console.log(node);
    var curr_node = node;
    while(curr_node){
        console.log(curr_node.data);
        curr_node = curr_node.next;
    }
};