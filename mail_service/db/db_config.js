db = require('mysql');

var mysqlConnect = function () {
       var connection = db.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'contact_detail'
       });
      
       return connection;
   };
   module.exports.localConnect = mysqlConnect;