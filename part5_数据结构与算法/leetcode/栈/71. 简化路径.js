var simplifyPath = function(path) {
  let pathArr = path.split('/')
  
  let stack = []
  for (let i = 0; i < pathArr.length; i++) {
      const path = pathArr[i]
      if(path === '..') {
          stack.pop()
      }else if(path && path !== '.') {
          stack.push(path)
      }
  }

  return '/' + stack.join('/')
};