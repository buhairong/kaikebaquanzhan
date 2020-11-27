/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  if(x === 0 || x === 1) {
    return x
  }

  let start = 1
  let end = parseInt(x/2)+1
  

  while(start <= end) {
    let mid = parseInt((start+end)/2)
    if(mid * mid === x) {
      return mid
    }else if(mid * mid > x) {
      end = mid-1
    }else if(mid * mid < x) {
      start = mid+1
    }
  }

  return end
};