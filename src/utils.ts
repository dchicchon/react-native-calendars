export const omit = (keys: any, obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
};
export const some = (collection: any, predicate: any) => {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i], i, collection)) {
        return true;
      }
    }
  } else if (typeof collection === 'object' && collection !== null) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key) && predicate(collection[key], key, collection)) {
        return true;
      }
    }
  }
  return false;
};

export const isEqual = (obj1: any, obj1copy: any) => {
  JSON.stringify(obj1) === JSON.stringify(obj1copy);
};

export const pickBy = (object: Object, predicate: Function) => {
  const result = {};

  for (const key in object) {
    // @ts-expect-error
    if (object.hasOwnProperty(key) && predicate(object[key], key, object)) {
      // @ts-expect-error
      result[key] = object[key];
    }
  }

  return result;
};

export const get = (object: Object, path: any, defaultValue?: any) => {
  const keys = path.split('.');
  let result = object;

  for (let key of keys) {
    if (result && typeof result === 'object' && key in result) {
      // @ts-expect-error
      result = result[key];
    } else {
      return defaultValue;
    }
  }

  return result;
};

export const includes = (collection: any, value: any, fromIndex = 0) => {
    if (Array.isArray(collection)) {
      for (let i = fromIndex; i < collection.length; i++) {
        if (collection[i] === value) {
          return true;
        }
      }
    } else if (typeof collection === 'string') {
      return collection.includes(value, fromIndex);
    } else if (typeof collection === 'object' && collection !== null) {
      for (let key in collection) {
        if (collection.hasOwnProperty(key) && collection[key] === value) {
          return true;
        }
      }
    }
  
    return false;
  }