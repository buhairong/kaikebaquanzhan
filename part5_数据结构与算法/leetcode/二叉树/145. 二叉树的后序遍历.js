/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归
var postorderTraversal1 = function(root, arr=[]) {
    if(root) {
        postorderTraversal(root.left, arr)
        postorderTraversal(root.right,arr)
        arr.push(root.val)
    }
    return arr
};


// 迭代
var postorderTraversal = function(root) {
  const result = [];
  const stack = [];
  let last = null; // 标记上一个访问的节点
  let current = root;
  while (current || stack.length > 0) {
      while (current) {
          stack.push(current);
          current = current.left;
      }
      current = stack[stack.length - 1];
      if (!current.right || current.right == last) {
          current = stack.pop();
          result.push(current.val);
          last = current;
          current = null; // 继续弹栈
      } else {
          current = current.right;
      }
  }
  return result;
};