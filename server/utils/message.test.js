var expect = require('expect');
var {generateMessage} = require('./messages');

describe('generateMessage',()=>{
    var from='admin';
    var text= 'test text';

    it('should generate correct message object',()=>{
        var message = generateMessage(from,text);
        expect(message.createdAt).toBeA('number');

        expect(message).toInclude({from, text});
        
        
    })
});