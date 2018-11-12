
const HashMap = require('./hashmap');

function isPalindrome(str) {
  const charCounts = new HashMap();
  // build a complete count before doing anything
  for(const c of str) {
    let currentCount = charCounts.get(c);
    currentCount = currentCount ? currentCount : 0;
    charCounts.set(c, currentCount+1);
  }

  let hasOddCount = false;
  for(const c of str) {
    const isSymmetric = charCounts.get(c) % 2 === 0;
    if(!isSymmetric) {
      // 2+ odd letter counts means it can't be a palindrome?
      if(hasOddCount) {
        return false;
      } else {
        // one odd "pivot element" in the center is ok
        hasOddCount = true;
      }
    }
  }
  // if every letter can be paired (or a single letter can be placed in the middle), then it's a palindrome
  return true;
}

console.log(isPalindrome('accarr'));