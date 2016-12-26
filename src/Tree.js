import * as util from './util';
import * as ensure from './ensure';

export function hasChildren(node) {
    return (Array.isArray(node.children) && node.children.length > 0);
}

/**
 * Results a new array (immutable) obtained by applying the callback function to
 * each node of the tree recursively.
 *
 * @param tree
 * @param callback
 */
export function map(tree, callback) {
    // If the tree is not an array make it an array
    if (!Array.isArray(tree)) {
        return map([tree], callback);
    }

    return mapTree(tree, callback);
}

/**
 * Filters the tree recursively depending upon the boolean value returned by the callback
 * for each node.
 *
 * @param tree
 * @param callback
 * @param includeChildren
 */
export function filter(tree, callback, includeChildren = false) {
    tree = ensure.arrayOfNodes(tree);

    // Whether or not to include the child nodes even if their parent nodes aren't included.
    if (includeChildren === true) {
        return filterTreeInclusive(tree, callback);
    }

    return filterTree(tree, callback);
}

/**
 * Flatten (linearize) the tree into a linear array of nodes.
 *
 * @param tree
 * @returns {Array}
 */
export function flatten(tree) {
    let list = [];
    let nodes = Array.isArray(tree) ? tree : [tree];

    nodes.forEach(node => {
        let copyOfNode = util.copyExcludingKeys(node, ['children']);

        list.push(copyOfNode);

        if (hasChildren(node)) {
            list = list.concat(flatten(node.children));
        }
    });

    return list;
}

export function fmap(tree, filterCallback, mapCallback, inclusive = false) {
    tree = ensure.arrayOfNodes(tree);

    if (!util.isFunction(filterCallback)) {
        throw new TypeError(`Expected second argument to be a function. ${typeof filterCallback} given.`);
    }

    if (inclusive === true) {
        // TODO: Implement for inclusive
        return [];
    }

    return fmapTree(tree, filterCallback, mapCallback);
}

function fmapTree(tree, filterCallback, mapCallback) {
    if (!util.isFunction(mapCallback)) {
        return filterTree(tree, filterCallback);
    }

    return filterAndMap(tree, filterCallback, (node, index) => {
        let mappedNode = mapCallback(node, index);

        // If the node has children then recursively apply the filter and map to them as well.
        if (hasChildren(node)) {
            mappedNode.children = filterAndMap(node.children, filterCallback, mapCallback);
        }

        return mappedNode;
    });
}

function filterAndMap(tree, filterCallback, mapCallback) {
    let result = [];

    for (let index = 0; index < tree.length; index++) {
        let node = tree[index];
        let shouldIncludeIt = filterCallback(node, index);

        // If the condition holds false for a single node
        // ignore the whole tree of that node (including all it's children).
        if (!shouldIncludeIt) {
            continue;
        }

        result.push(mapCallback(node, index));
    }

    return result;
}

/**
 * Filter and return a new tree such that the nodes for which the callback
 * returns false would be skipped along with all of their child nodes.
 *
 * @param tree
 * @param callback
 * @returns {Array}
 */
function filterTree(tree, callback) {
    return filterAndMap(tree, callback, (node) => {
        if (hasChildren(node)) {
            node.children = filterTree(node.children, callback);
        }

        return node;
    });
}

/**
 * Filter and return a new tree such that the nodes for which the callback returns false
 * would be skipped but their children might be added to the new tree if the callback returns true
 * for those.
 * Note: The tree structure might change for this, as the children nodes could climb up the hierarchy
 * in case their parents aren't included.
 *
 * @param tree
 * @param callback
 */
function filterTreeInclusive(tree, callback) {
    let result = [];

    if (!Array.isArray(tree)) {
        return [];
    }

    for (let index = 0; index < tree.length; index++) {
        let node = tree[index];
        let shouldIncludeIt = callback(node, index);
        let filteredChildren = filterTreeInclusive(node.children, callback);

        if (shouldIncludeIt) {
            // If the condition holds true then include the node
            // along with it's filtered children.
            node.children = filteredChildren;
            result.push(node);
        } else {
            // Otherwise, just add the filtered children to the resulting filtered tree.
            result = result.concat(filteredChildren);
        }
    }

    return result;
}

/**
 * The actual implementation of the recursive map() function for trees.
 *
 * @param tree
 * @param callback
 * @returns {Array}
 */
function mapTree(tree, callback) {
    return tree.map((node, index) => {
        let mappedNode = callback(node, index);

        // If the node has children then map them as well.
        if (hasChildren(node)) {
            mappedNode.children = mapTree(node.children, callback);
        }

        return mappedNode;
    });
}

/**
 * Counts the number of nodes a tree has.
 *
 * @param tree
 * @returns {number}
 */
export function count(tree) {
    tree = ensure.arrayOfNodes(tree);

    return tree.reduce((acc, node) => {
        let childTreeCount = hasChildren(node) ? count(node.children) : 0;

        return acc + childTreeCount;
    }, tree.length);
}

/**
 * Walks through each node of the tree and applies the callback to each node walked.
 *
 * @param tree
 * @param callback
 */
export function walk(tree, callback) {
    tree = ensure.arrayOfNodes(tree);

    tree.forEach((node, index) => {
        callback(node, index);

        if (hasChildren(node)) {
            walk(node.children, callback);
        }
    });
};
