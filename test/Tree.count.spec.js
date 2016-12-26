import chai from 'chai';
import {count} from '../src/Tree';

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
                    id: 4,
                    name: 'Test Node 4'
                },
                {
                    id: 5,
                    name: 'Test Node 5'
                }
            ]
        }
    ]
};
const tree2 = [
    {
        id: 1,
        name: 'Test Node 1'
    },
    {
        id: 2,
        name: 'Test Node 2'
    }
];

describe('Tree.count()', () => {
    it('should throw an error if anything other than an object or array is provided.', () => {
        expect(() => count([])).to.not.throw(TypeError);
        expect(() => count({})).to.not.throw(TypeError);
        expect(() => count('foo')).to.throw(TypeError);
        expect(() => count(true)).to.throw(TypeError);
    });
    
    it('should return the number of nodes for a non-linear tree', () => {
        expect(count(tree1)).to.equal(5);
    });

    it('should return the number of nodes for a simple linear tree', () => {
        expect(count(tree2)).to.equal(2);
    });
});
