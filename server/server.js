const path= require('path');
const express = require('express');

const publicPath = path.join(__dirname,'../public');
console.log(publicPath);

const app = express();
const port = process.env.PORT ||3000;

//configure express static middleware to server a directory for views
app.use(express.static(publicPath));


app.listen(port,()=>{
    console.log('server started at port 3000');
});