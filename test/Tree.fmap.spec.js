import chai from 'chai';
import {fmap} from '../src/Tree';

const {expect} = chai;

describe('Tree.fmap()', () => {
    it('should return first filter the tree, map it and return the result tree', () => {
        const data = [
            {
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
                    }
                ]
            }
        ];
        const result = fmap(data,
            node => node.id === 1 || (node.id % 2 === 0), // Only odd ids or 1
            node => ({elementId: node.id})
        );
        const expected = [
            {
                elementId: 1,
                children: [
                    {elementId: 2}
                ]
            }
        ];
        expect(expected).to.deep.equal(result);
    });
});
