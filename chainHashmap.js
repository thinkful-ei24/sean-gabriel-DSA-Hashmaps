class HashMap {
  constructor(initialCapacity = 15) {
    this.length = 0;
    this._capacity = initialCapacity;
    this._slots = [];
    this.deleted = 0;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < this._capacity; i++) {
      const element = this._slots[i];
      if (element === undefined || (element.key === key && !element.deleted)) {
        return i;
      }
    }
  }

  _resize(newCapacity) {
    const oldSlots = this._slots;
    this._capacity = newCapacity;

    this.length = 0;
    this._deleted = 0;
    this._slots = [];
    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;

    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);

    const oldArrayValues = this.get(key);

    if (Array.isArray(oldArrayValues)) {
      this._slots[index] = {
        key,
        value: [value, ...oldArrayValues],
        deleted: false
      };
      this.length++;
    } else {
      this._slots[index] = {
        key,
        value: [value],
        deleted: false
      };
      this.length++;
    }
  }

  get(key) {
    const index = this._findSlot(key);
    const foundKey = this._slots[index];
    let foundValue;

    if (foundKey) {
      foundValue = foundKey.value;
      return foundValue[0];
    }

    /*
    foundKey: {
      oldValue: 5

      value: [
        => {a: 3}, ({a: 2}, {a: 1})
      ]
    }
    */
  }

  remove(key) {
    const index = this._findSlot(key);
    this._slots[index].deleted = true;
    this.length--;
    this._deleted++;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

function main() {
  const hashmap = new HashMap();
  hashmap.set('a', 1);
  hashmap.set('a', 1);
  hashmap.set('a', 4);
  hashmap.set('b', 2);
  hashmap.set('c', 3);
  console.log(hashmap.get('a'));
}

main();

module.exports = HashMap;
