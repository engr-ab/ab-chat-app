var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./messages');

describe('generateMessage:',()=>{
    var from='admin';
    var text= 'test text';

    it('should generate correct message object',()=>{
        var message = generateMessage(from,text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});   
    });
});

describe('generateLocationMessage:', ()=>{
    var from = 'ab'; var lat = 15; var lan = 16; 
    var url = `https://www.google.com/maps?q=${lat},${lan}`;
    var message = generateLocationMessage(from, lat, lan);

    it('Should generate correct location object',()=>{
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});