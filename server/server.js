const path= require('path');
const express = require('express');

const publicPath = path.join(__dirname,'../public');
console.log(publicPath);

const app = express();

//configure express static middleware to server a directory for views
app.use(express.static(publicPath));


app.listen(3000,()=>{
    console.log('server started at port 3000');
})