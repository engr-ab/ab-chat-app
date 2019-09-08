//for documentation visit momentjs.com,  https://momentjs.com/docs/#/displaying/

const moment =  require('moment');
var date = moment(); // by default moment first argument is current timestap, but you can pass any time like  123454353458 and format it
new Date().getTime ==  moment().valueOf();  //current timestap
console.log(date.format('h:mm a'));
//2 padded 
//02 unpadded hour