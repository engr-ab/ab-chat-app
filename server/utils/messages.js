var moment = require('moment');
var generateMessage = (from,text)=>{
    return {
        from,
        text,
        createdAt : moment().valueOf() //returns timestamp e.g 123456, -578465764
    };
};

var generateLocationMessage = (from,latitude,longitude)=>{
    return {
        from:from,
        url : `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt : moment().valueOf()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
};