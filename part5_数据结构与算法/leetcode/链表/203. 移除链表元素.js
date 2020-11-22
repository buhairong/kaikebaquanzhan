/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  let ele = {
    next: head
  }
  let cur = ele

  while(cur.next) {
    if(cur.next.val === val) {
      cur.next = cur.next.next
    }else {
      cur = cur.next
    }
  }

  return ele.next
};