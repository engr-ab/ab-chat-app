var expect = require('expect');

var{isRealString} = require('./validators');
 describe('isRealString:', ()=>{

    //should reject not string
    it('should reject non string', ()=>{
        expect(isRealString(444444)).toBe(false);
    });
    //should reject string with only spaces
    it('should  reject string with only spaces ', ()=>{
        expect(isRealString('       ')).toBe(false);
    });
    //should allow string non space chracters    
    it('should allow string non space chracters', ()=>{
        expect(isRealString('i am string')).toBe(true);
    });
 });