import chai from 'chai';
import * as util from '../src/util';

const {assert, expect} = chai;

describe('util.arrayIncludes()', () => {
    it('should return true if the array includes the value', () => {
        assert.isTrue(util.arrayIncludes(['Foo', 'Bar'], 'Foo'));
    });

    it('should return false if the array doesn\'t the value', () => {
        assert.isFalse(util.arrayIncludes(['Foo', 'Bar'], 'Test'));
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
        assert.isTrue(util.isFunction(() => 'hello'));
    });

    it('should return false if the argument is not a function', () => {
        assert.isFalse(util.isFunction('hello'));
    });
});

describe('util.isObject()', () => {
    it('should return true if the argument is a simple object literal', () => {
        assert.isTrue(util.isObject({foo: 'bar'}));
    });

    it('should return true for the Object constructor', () => {
        assert.isTrue(util.isObject(Object));
    });

    it('should return true for any function as well', () => {
        assert.isTrue(util.isObject(() => 'test'));
    });

    it('should return false if the argument is null', () => {
        assert.isFalse(util.isObject(null));
    });

    it('should return false if the argument is boolean', () => {
        assert.isFalse(util.isObject(true));
    });

    it('should return false if the argument is undefined', () => {
        assert.isFalse(util.isObject());
    });
});
