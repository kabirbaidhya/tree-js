import {isObject} from './util';

/**
 * Ensures the tree passed is an Array, converts to array if an object is passed instead.
 * Throws an Error for invalid input.
 *
 * @param tree
 * @returns {Array}
 */
export function arrayOfNodes(tree) {
    // The tree should be an either array of nodes or an object representing a root node.
    if (!Array.isArray(tree) && isObject(tree)) {
        tree = [tree];
    } else if (!Array.isArray(tree)) {
        throw new TypeError(`Expected the first argument to be an array or an object. ${typeof tree} given.`);
    }

    return tree;
}
