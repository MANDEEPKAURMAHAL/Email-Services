var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config/config');
const cron = require('node-cron');
let userController = require('../controller/userController');

// Running a task every minute
cron.schedule('* * * * *', () => {
    try {
        userController.getCredentialDetailForMail().then((data) => {
            userController.sendMail(data).then((data) => {
                userController.sendActiveFlag(data).then((data) => {
                    console.log(data);
                }).catch((e) => {
                    console.log("in catch");
                });
            }).catch((e) => {
                console.log("in catch");
            });
        }).catch((e) => {
            console.log("no user to send mail");
        });
    } catch (err) {
        return reject({ msg: 'check reject' });
    };
});
module.exports = router