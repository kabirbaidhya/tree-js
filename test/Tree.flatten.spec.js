import chai from 'chai';
import {flatten} from '../src/Tree';

const {expect} = chai;

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
const tree1Flattened = [
    {
        id: 1,
        name: 'Test Node 1'
    },
    {
        id: 2,
        name: 'Test Node 2'
    },
    {
        id: 3,
        name: 'Test Node 3'
    },
    {
        id: 8,
        name: 'Test Node 8'
    },
    {
        id: 4,
        name: 'Test Node 3'
    },
    {
        id: 6,
        name: 'Test Node 6'
    },
    {
        id: 7,
        name: 'Test Node 7'
    },
    {
        id: 5,
        name: 'Test Node 3'
    }
];

describe('Tree.flatten()', () => {
    it('should convert the tree into a linear list of nodes', () => {
        expect(flatten(tree1)).to.deep.equal(tree1Flattened);
    });
});
