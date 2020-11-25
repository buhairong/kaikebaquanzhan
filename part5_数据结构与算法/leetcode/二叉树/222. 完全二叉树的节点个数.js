/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
  let result = 0
  function count(node) {
       if (node&&node.val !== null) {
          result++;
          if (node.left !== null) {
            count(node.left);
          }
          if (node.right !== null) {
            count(node.right);
          }
        }
  }
  count(root)
  return result
};