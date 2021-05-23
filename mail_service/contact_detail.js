const express = require('express');
const app = express();
let port = 8090;
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use('/user', require('./routes/user.js'));
app.use('/sendEmail', require('./routes/sendEmail.js'));
app.listen(port,()=>{
    console.log("app listening at",port)
});
