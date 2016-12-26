import chai from 'chai';
import {hasChildren}from '../src/Tree';

const {assert} = chai;

const tree1 = {
    id: 1,
    name: 'Test Node 1',
    children: [
        {
            id: 2,
            name: 'Test Node 2'
        }
    ]
};

describe('Tree.hasChildren()', () => {
    it('should return true for a node that has children', () => {
        assert.isTrue(hasChildren(tree1));
    });

    it('should return false for a node that doesn\'t have children', () => {
        assert.isFalse(hasChildren(tree1.children[0]));
    });
});
