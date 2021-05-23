var express = require('express');
var router = express.Router();
var db = require('../db/db_config').localConnect();
let userController = require('../controller/userController');
var HttpStatus = require('http-status-codes');

// API for inserting credential detail
// Rescheduling (ie., Update) add user_id for update
router.post('/createCredentials', (req, res) => {
    userController.createCredentials(req).then((data) => {
        res.send(
            data
        );
    }).catch((e) => {
        res.status(HttpStatus.CONFLICT).send(e);
    });
});
// API For failed/unsent scheduled emails
router.get('/getFailedOrUnsendMail', (req, res) => {
    userController.getFailedOrUnsendMail(req).then((data) => {
        res.send(
            data
        );
    }).catch((e) => {
        res.status(HttpStatus.CONFLICT).send(e);
    });
});
// API for Getting Credential Detail
//parameter active_status
// active_staus = 1 For email to be send
// active_flag = 2 for email already sent
// active_flag = 3 for delected email
router.get('/getCredentialDetail', (req, res) => {
    userController.getCredentialDetail(req).then((data) => {
        res.send(data);
    }).catch((e) => {
        res.status(HttpStatus.CONFLICT).send(e);
    });
});
// API for change active _status
router.post('/changeActivetStatus', (req, res) => {
    userController.changeActivetStatus(req).then((data) => {
        res.send(data);
    }).catch((e) => {
        res.status(HttpStatus.CONFLICT).send("Not Found");
    });
});









module.exports = router