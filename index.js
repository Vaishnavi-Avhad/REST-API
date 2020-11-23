const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const Response = require("./response");

app.use(bodyparser.json());

this.response = new Response();

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

//Get all users
app.get('/Getusers', (req, res) => {
    mysqlConnection.query('SELECT * FROM user',(err, rows, fields)=>{
        let returnValue = "";
        let self = this;
        if(!err){
            returnValue = self.response.success(rows);
            res.send(returnValue);
        }else
            console.log(err);
    })
});


//Get single user
app.get('/user/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM user WHERE ID = ?',[req.params.id],(err, rows, fields)=>{
        let returnValue = "";
        let self = this;
        if(!err){
            returnValue = self.response.success(rows);
            res.send(returnValue);
        }else
            console.log(err);
    })
});

//Delete user
app.delete('/user/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM user WHERE ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('True');
        else
            console.log(err);
    })
});

//Insert user
app.post('/adduser', (req, res) => {
    let user = req.body;
    var sql = "SET @ID = ?;SET @FIRSTNAME = ?;SET @LASTNAME = ?;SET @ADDRESS = ?; SET @ORGNAME = ?; SET @SALARY = ?; \
    CALL UserAddOrEdit(@ID,@FIRSTNAME,@LASTNAME,@ADDRESS,@ORGNAME,@SALARY);";
    mysqlConnection.query(sql, [user.ID, user.FIRSTNAME, user.LASTNAME, user.ADDRESS,user.ORGNAME, user.SALARY], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted user id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

//Update user
app.put('/updateuser', (req, res) => {
    let user = req.body;
    var sql = "SET @ID = ?;SET @FIRSTNAME = ?;SET @LASTNAME = ?;SET @ADDRESS = ?; SET @ORGNAME = ?; SET @SALARY = ?; \
    CALL EmployeeAddOrEdit(@ID,@FIRSTNAME,@LASTNAME,@ADDRESS,@ORGNAME,@SALARY);";
    mysqlConnection.query(sql, [user.ID, user.FIRSTNAME, user.LASTNAME, user.ADDRESS,user.ORGNAME, user.SALARY], (err, rows, fields) => {
        if (!err)
        res.send('Updated successfully');
        
        else
            console.log(err);
    })
});

app.listen(3000, () => {
    console.log('Express server is running at http://localhost:3000');
});