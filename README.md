# Email-Services
This code is owned by mandeepkaur1208@gmail.com


This code snippet is used for scheduling Emails.
Following are the features handled as part of this code:
    1. Schedule Email using Nodemailer package for mail Ids to be sent at particular time.
    2. Store the details of Scheduled mail in the DB(Mysql).
    3. List the details of Scheduled mails.
    4. Update the details of Scheduled mails.
    5. Soft Delete the enteries from the database.
    6. Store the details of the rejected mails.
    7. APis provided for above operation(Email Services.postman_collection.json)
    8. Database with structure (contact_detail.sql)
    
  Technoogy/Language/Packages/Dependencies
  Node.js v10.16.3
  "body-parser": "^1.19.0",
  "email-validator": "^2.0.4",
  "express": "^4.17.1",
  "http-status-codes": "^2.1.4",
  "moment": "^2.29.1",
  "mysql": "^2.18.1",
  "node-cron": "^3.0.0",
  "nodemailer": "^6.6.0",
  "nodemon": "^2.0.7"
