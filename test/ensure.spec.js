import chai from 'chai';
import * as ensure from '../src/ensure';

const {expect} = chai;

describe('ensure.arrayOfNodes()', () => {
    it('should throw an error if anything other than an object or array is provided', () => {
        expect(() => ensure.arrayOfNodes([])).to.not.throw(TypeError);
        expect(() => ensure.arrayOfNodes({})).to.not.throw(TypeError);
        expect(() => ensure.arrayOfNodes('foo')).to.throw(TypeError);
        expect(() => ensure.arrayOfNodes(true)).to.throw(TypeError);
    });

    it('should wrap the object inside an array if object is passed', () => {
        expect(ensure.arrayOfNodes({foo: 'bar'})).to.deep.equal([{foo: 'bar'}]);
    });
});
