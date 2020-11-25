/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  // 如果root同时小于p和q,去右边找
  // 如果root同时大于p和q,去左边找
  // 否则就是找到了
  if(root.val < p.val && root.val < q.val) {
    return lowestCommonAncestor(root.right, p, q)
  }else if(root.val > p.val && root.val > q.val) {
    return lowestCommonAncestor(root.left, p, q)
  }else {
    return root
  }
};