import chai from 'chai';
import * as util from '../src/util';

const {expect} = chai;

describe('util.arrayIncludes()', () => {
    it('should return true if the array includes the value', () => {
        expect(util.arrayIncludes(['Foo', 'Bar'], 'Foo')).to.be.true;
    });

    it('should return false if the array doesn\'t the value', () => {
        expect(util.arrayIncludes(['Foo', 'Bar'], 'Test')).to.be.false;
    });
});

describe('util.copyExcludingKeys()', () => {
    it('should return all the keys expect the excluded ones', () => {
        let object = {
            id: 1,
            name: 'Test Node 1',
            children: [
                {
                    id: 2,
                    name: 'Test Node 2'
                }
            ],
            foo: 'Bar',
            title: 'Test'
        };
        let result = util.copyExcludingKeys(object, ['children', 'name']);
        let expected = {
            id: 1,
            foo: 'Bar',
            title: 'Test'
        };

        expect(result).to.deep.equal(expected);
    });
});

describe('util.isFunction()', () => {
    it('should return true if the argument is a function', () => {
        expect(util.isFunction(() => 'hello')).to.be.true;
    });

    it('should return false if the argument is not a function', () => {
        expect(util.isFunction('hello')).to.be.false;
    });
});

describe('util.isObject()', () => {
    it('should return true if the argument is a simple object literal', () => {
        expect(util.isObject({foo: 'bar'})).to.be.true;
    });

    it('should return true for the Object constructor', () => {
        expect(util.isObject(Object)).to.be.true;
    });

    it('should return true for any function as well', () => {
        expect(util.isObject(() => 'test')).to.be.true;
    });

    it('should return false if the argument is null', () => {
        expect(util.isObject(null)).to.be.false;
    });

    it('should return false if the argument is boolean', () => {
        expect(util.isObject(true)).to.be.false;
    });

    it('should return false if the argument is undefined', () => {
        expect(util.isObject()).to.be.false;
    });
});
