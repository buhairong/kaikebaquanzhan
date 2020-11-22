// 141
var hasCycle = function(head) {
  if(!head || !head.next) {
    return false
  }

  let fast = head.next
  let slow = head

  while(slow != fast) {
      if(!fast || !fast.next) {
          return false
      }

      slow = slow.next
      fast = fast.next.next

  }

  return true
};