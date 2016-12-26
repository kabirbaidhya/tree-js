/**
 * Checks if the array includes an item.
 *
 * @param array
 * @param item
 * @returns {boolean}
 */
export function arrayIncludes(array, item) {
    if (!Array.isArray(array)) {
        throw new TypeError(`arrayIncludes() expects the first argument to be an Array, ${typeof array} given.`);
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            return true;
        }
    }

    return false;
}
/**
 * Returns a copy of object (shallow) excluding the keys provided.
 *
 * @param object
 * @param excludeKeys
 * @returns {Object}
 */
export function copyExcludingKeys(object, excludeKeys = []) {
    let copy = {};

    for (let key in object) {
        if (object.hasOwnProperty(key) && !arrayIncludes(excludeKeys, key)) {
            copy[key] = object[key];
        }
    }

    return copy;
}

/**
 * Checks if the parameter passed is a function.
 *
 * @param param
 */
export function isFunction(param) {
    return (typeof param === 'function');
}
