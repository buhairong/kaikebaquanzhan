var isValid = function(s) {
  let obj = {"(":")", "[":"]", "{":"}"}
    let stack = []
    for(i=0;i<s.length;i++) {
      let curStr = s[i]
      
      if(curStr in obj) {
        stack.push(curStr)
      }else {
        if(curStr != obj[stack.pop()]) {
          return false
        }
      }
    }
  
    return !stack.length
};