const mysql = require('mysql');


var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Vaishnavi@123',
    database: 'userdb',
    multipleStatements : true
});


mysqlConnection.connect((err)=>{
    if(!err)
        console.log("DB Connection Successful");
    else
        console.log("DB Connection Failed \n Error : " + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;
