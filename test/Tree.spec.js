import {assert, expect} from 'chai';
import * as Tree from '../src/Tree';

const tree1 = {
    id: 1,
    name: 'Test Node 1',
    children: [
        {
            id: 2,
            name: 'Test Node 2'
        },
        {
            id: 3,
            name: 'Test Node 3',
            children: [
                {
                    id: 8,
                    name: 'Test Node 8'
                }
            ]
        },
        {
            id: 4,
            name: 'Test Node 3',
            children: [
                {
                    id: 6,
                    name: 'Test Node 6'
                },
                {
                    id: 7,
                    name: 'Test Node 7'
                }
            ]
        },
        {
            id: 5,
            name: 'Test Node 3'
        }
    ]
};

describe('Tree.hasChildren', () => {
    it('should return true for a node that has children', () => {
        assert.isTrue(Tree.hasChildren(tree1));
    });

    it('should return false for a node that doesn\'t have children', () => {
        assert.isFalse(Tree.hasChildren(tree1.children[0]));
    });
});

describe('Tree.map', () => {
    it('should return an array result even if the single node is passed as an input', () => {
        let sourceNode = {
            id: 1,
            name: 'Test Node 1'
        };
        let result = [
            {
                elementId: 1,
                title: 'Test Node 1'
            }
        ];
        let mapped = Tree.map(sourceNode, node => ({
            elementId: node.id,
            title: node.name
        }));

        expect(mapped).to.deep.equal(result);
    });

    it('should work for a simple array like tree', () => {
        let sourceTree = [
            {
                id: 8,
                name: 'Test Node 8'
            },
            {
                id: 9,
                name: 'Test Node 9'
            }
        ];
        let result = [
            {
                elementId: 8,
                title: 'Test Node 8',
                selected: true
            },
            {
                elementId: 9,
                title: 'Test Node 9',
                selected: true
            }
        ];
        let mappedTree = Tree.map(sourceTree, node => ({
            elementId: node.id,
            title: node.name,
            selected: true
        }));

        expect(mappedTree).to.deep.equal(result);
    });

    it('should work for a complex tree with nested nodes', () => {
        const result = [
            {
                nodeId: 1,
                name: 'Test Node 1',
                children: [
                    {
                        nodeId: 2,
                        name: 'Test Node 2'
                    },
                    {
                        nodeId: 3,
                        name: 'Test Node 3',
                        children: [
                            {
                                nodeId: 8,
                                name: 'Test Node 8'
                            }
                        ]
                    },
                    {
                        nodeId: 4,
                        name: 'Test Node 3',
                        children: [
                            {
                                nodeId: 6,
                                name: 'Test Node 6'
                            },
                            {
                                nodeId: 7,
                                name: 'Test Node 7'
                            }
                        ]
                    },
                    {
                        nodeId: 5,
                        name: 'Test Node 3'
                    }
                ]
            }
        ];
        let mappedTree = Tree.map(tree1, ({id, name}) => ({nodeId: id, name}));

        expect(mappedTree).to.deep.equal(result);
    });

    it('should maintain the index correctly for nested nodes', () => {
        const result = [
            {
                index: 0,
                children: [
                    {index: 0},
                    {
                        index: 1,
                        children: [
                            {index: 0}
                        ]
                    },
                    {
                        index: 2,
                        children: [
                            {index: 0}, {index: 1}
                        ]
                    },
                    {index: 3}
                ]
            }
        ];
        let mappedTree = Tree.map(tree1, (node, index) => ({index}));

        expect(mappedTree).to.deep.equal(result);
    });
});
