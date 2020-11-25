/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 递归
var isValidBST1 = function(root, left=-Infinity, right=Infinity) {
  if(root == null) {
    return true
  }
  if(root.val <= left || root.val >= right) {
    return false
  }

  return isValidBST(root.left, left, root.val) && isValidBST(root.right, root.val, right)
};

// 迭代
var isValidBST = function(root) {
  const stack = []
  let cur = root
  let flag = -Infinity

  while(cur || stack.length > 0) {
    while(cur) {
      stack.push(cur)
      cur = cur.left
    }

    cur = stack.pop()
    if(cur.val <= flag) {
      return false
    }
    flag = cur.val
    cur = cur.right
  }

  return true
};