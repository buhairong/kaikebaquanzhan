// 104
var maxDepth = function(root) {
  if(!root) {
      return 0
  }

  if(!root.left && !root.right) {
      return 1
  }

  let h = 1
  return Math.max(maxDepth(root.left)+h, maxDepth(root.right)+h)
};