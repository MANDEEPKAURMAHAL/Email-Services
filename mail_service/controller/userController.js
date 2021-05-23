var db = require('../db/db_config').localConnect();
var mysql = require('mysql');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const moment = require('moment')
const validator = require("email-validator");

module.exports = {
    createCredentials: (req) => {
        return new Promise((resolve, reject) => {
            let email_status = validator.validate(req.body.user_email_address) ? '1' : '2';
            let user_id = req.body.user_id ? req.body.user_id : '';
            let user_email_address = req.body.user_email_address ? req.body.user_email_address : '';
            let user_subject = req.body.user_subject ? req.body.user_subject : '';
            let user_text = req.body.user_text ? req.body.user_text : '';
            let user_mail_schedule_date = req.body.user_mail_schedule_date ? req.body.user_mail_schedule_date : '';
            let userSql = 'INSERT tbl_email_scheduled SET ';
            let userGenrSql = '';

            if (user_id != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_id = ' + mysql.escape(user_id) + '';
            }
            if (user_email_address != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_email_address = ' + mysql.escape(user_email_address) + '';
            }
            if (user_subject != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_subject = ' + mysql.escape(user_subject) + '';
            }
            if (user_text != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_text = ' + mysql.escape(user_text) + '';
            }
            if (user_mail_schedule_date != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_mail_schedule_date = ' + mysql.escape(user_mail_schedule_date) + '';
            }
            if (email_status != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' email_status = ' + mysql.escape(email_status) + '';
            }
            userSql = userSql + ' ' + userGenrSql + ' , create_date = now() ON DUPLICATE KEY UPDATE ' + userGenrSql + ' ';

            db.query(userSql, (err, result) => {
                if (err) {
                    reject([]);
                } else {
                    resolve("Detail Updated");
                }
            });
        })
    },
    sendActiveFlag: (dat) => {
        return new Promise((resolve, reject) => {
            let data = dat.result;
            let active_status = 2;
            let values = [];
            for (let i = 0; i < data.length; i++)
                values.push([active_status, data[i].user_id])
            let userSql = "INSERT INTO tbl_email_scheduled (active_status,user_id) VALUES ? ON DUPLICATE KEY UPDATE active_status = VALUES(active_status) , user_id = VALUES(user_id) ";
            db.query(userSql, [values], (err, result) => {
                if (err) {
                    console.log(err);
                    return reject([]);
                } else {
                    return resolve("Done");
                }
            });
        });
    },
    getCredentialDetail: (req) => {
        return new Promise((resolve, reject) => {
            let active_status = req.query.active_status;
            let result = [];
            let userSql = 'SELECT user_id,user_email_address,user_subject,\n\
            user_text,user_mail_schedule_date FROM tbl_email_scheduled WHERE email_status = 1 ';
            userSql += ' AND active_status = ' + mysql.escape(active_status) + '' + "";
            db.query(userSql, (err, rows) => {
                if (err) {
                    reject([]);
                } else if (!rows.length) {
                    reject([]);
                } else {
                    rows.forEach(vl => {
                        result.push({
                            user_id: vl.user_id,
                            user_email_address: vl.user_email_address,
                            user_subject: vl.user_subject,
                            user_text: vl.user_text,
                            user_mail_schedule_date: moment(vl.user_mail_schedule_date).format('YYYY-MM-DD HH:mm:ss')
                        });
                    });
                    resolve(result)
                }
            });
        })
    },
    getFailedOrUnsendMail: (req) => {
        return new Promise((resolve, reject) => {
            let result = [];
            let userSql = 'SELECT user_id,user_email_address,user_subject,\n\
            user_text,user_mail_schedule_date FROM tbl_email_scheduled WHERE email_status = 2 ';
            db.query(userSql, (err, rows) => {
                if (err) {
                    reject([]);
                } else if (!rows.length) {
                    reject([]);
                } else {
                    rows.forEach(vl => {
                        result.push({
                            user_id: vl.user_id,
                            user_email_address: vl.user_email_address,
                            user_subject: vl.user_subject,
                            user_text: vl.user_text,
                            user_mail_schedule_date: moment(vl.user_mail_schedule_date).format('YYYY-MM-DD HH:mm:ss')
                        });
                    });
                    resolve(result)
                }
            });
        })
    },
    getCredentialDetailForMail: () => {
        return new Promise((resolve, reject) => {
            let result = [];
            let userSql = 'SELECT user_id,user_email_address,user_subject,\n\
            user_text,user_mail_schedule_date FROM tbl_email_scheduled WHERE active_status = 1 AND email_status = 1 ';
            db.query(userSql, (err, rows) => {
                if (err) {
                    reject([]);
                } else if (!rows.length) {
                    reject([]);
                } else {
                    rows.forEach(vl => {
                        if (moment(vl.user_mail_schedule_date).format('YYYY-MM-DD HH:mm') === moment().format('YYYY-MM-DD HH:mm')) {
                            result.push({
                                user_id: vl.user_id,
                                user_email_address: vl.user_email_address,
                                user_subject: vl.user_subject,
                                user_text: vl.user_text,
                                user_mail_schedule_date: vl.user_mail_schedule_date
                            });
                        } else {
                            console.log('no user for mail')
                        }
                    });
                    return resolve(result);
                }
                return reject([])
            });
        })
    },
    sendMail: (data) => {
        return new Promise((resolve, reject) => {
            data.forEach(v1 => {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    secure: false,
                    port: 587,
                    auth: {
                        user: config.user,
                        pass: config.pass
                    },
                    tls: { rejectUnauthorized: false },
                });
                const mailOptions = {
                    from: config.user,
                    to: v1.user_email_address,
                    subject: v1.user_subject,
                    text: v1.user_text
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err);
                        return reject([]);
                    } else {
                        return resolve({ result: data });
                    }
                });
            })
        });
    },
    changeActivetStatus: (req) => {
        return new Promise((resolve, reject) => {
            let user_id = req.body.user_id;
            let active_status = req.body.active_status;
            let userSql = 'INSERT INTO tbl_email_scheduled SET';
            let userGenrSql = '';
            userGenrSql += ' user_id = ' + mysql.escape(user_id) + ',';
            userGenrSql += ' active_status = ' + mysql.escape(active_status) + '';
            userSql = userSql + ' ' + userGenrSql + ' ON DUPLICATE KEY UPDATE ' + userGenrSql + ' ';
            db.query(userSql, (err, result) => {
                if (err) {
                    console.log(err);
                    return reject([]);
                } else {
                    return resolve("Detail Updated");
                }
            });
        });
    },
}