
const HashMap = require('./hashmap');

function group(anagrams) {
  const anagramMap = new HashMap();
  for(const word of anagrams) {
    const key = word.split('').sort().join('');
    let anagramList = anagramMap.get(key);
    if(!anagramList) {
      anagramList = [];
    }
    anagramList.push(word);
    anagramMap.set(key, anagramList);
  }

  const returnArray = [];
  for(const pair of anagramMap._slots) {
    if(pair) {
      returnArray.push(pair.value);
    }
  }
  return returnArray;
}

const testData = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
const out = group(testData);
console.log(out);