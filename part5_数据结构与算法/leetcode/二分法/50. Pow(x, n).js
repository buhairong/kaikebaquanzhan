/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
  if(n === 0) {
    return 1
  }else if(n === 1) {
    return x
  }else if(n === -1) {
    return 1/x
  }

  let total = 1
  let abs = Math.abs(n)
  while(abs) {
    if(abs%2 === 1) {
      total *= x
    }

    if(abs === 1) {
      return n > 0 ? total : 1/total
    }

    x = x * x
    abs = parseInt(abs/2)
  }

  
};