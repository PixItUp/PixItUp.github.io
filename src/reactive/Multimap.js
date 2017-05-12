// @flow

export type MultiMap<Key, Value> = {
  set: (Key, Value) => void,
  get: (Key) => ?Array<Value>
}

export function makeMultiMap<Key, Value>(): MultiMap<Key, Value>{
  const map: Map<Key, Array<Value>> = new Map();
  return {
    set: function(key: Key, value: Value){
      const val = map.get(key);
      if (val){
        val.push(value);
      } else {
        map.set(key, [value]);
      }
    },
    get: function(key){
      const val = map.get(key);
      if (val){
        return val;
      } else {
        return undefined
      }
    }
  }
}
