/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function(n) {
  let start = 1
  let end = n

  while(true) {
    let mid = Math.floor((start+end)/2)
    let res = guess(mid)
    if(res === -1) {
      end = mid
    }else if(res === 1) {
      start = mid+1
    }else{
      return mid
    }
  }

};