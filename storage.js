import AsyncStorage from "@react-native-async-storage/async-storage";

/*
  Going for CRUD here

  Also probably multiple crud support in the future...
  there's also multiple set, get, clear, get all, etc.
  https://react-native-async-storage.github.io/async-storage/docs/api
*/

/*
  propery naming convention is
  http/common name:api name
  - can't name function delete :C
*/
export const Storage = {
  get: get, //hoisted
  post: set,
  put: merge,
  remove: remove,
};

async function remove(value) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

async function merge(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

async function set(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`set ${key}:${jsonValue}`);
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

async function get(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    const output = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(`got ${key}:`, output);
    return output;
  } catch (e) {
    console.warn(e);
    return false;
  }
}
