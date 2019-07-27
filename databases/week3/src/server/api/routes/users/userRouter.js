'use strict';

const sql = require('../../../db');
// router setup
const express = require('express');
const router = express.Router({ mergeParams: true });

const bodyParser = require('body-parser');
//router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router.use(bodyParser.json()); // support json encoded bodies


function handleError(res, error) {
    res.status(500);
    res.end(JSON.stringify({
        message: "A SQL error occurred.",
        error: error.sqlMessage
    }));
}

router.get('/test', (req, res, next) => {
    // body requests
    console.log(req.body);
    // query parameters
    console.log(req.query);
    //sql.query(`SELECT * FROM \`database-node-api\`.users;`, function (error, result) {
    sql.query('SELECT * FROM users', function (error, result) {
        res.setHeader('Content-Type', 'application/json');
        if (error) return handleError(res, error);
        res.end(JSON.stringify(result));
    });
});

router.post('/', (req, res, next) => {
    // Create the sql that inserts a new user into the database. The data is gotten from the req.body
    // Find the fields from the database-node-api.sql

    /* POST: http://localhost:5000/api/users/
    {
        "email": "John_doe@hyf.dk",
        "password": "john@doe",
        "create_time": "2019-07-02",
        "age": 40,
        "name": "John Doe",
        "country": "USA"
    }   
    */ 
   // body requests
    console.log(req.body); 
    // build the INSERT query string
    let insertQuery = 'INSERT INTO users (email, password, create_time, age, name, country) VALUES (?,?,?,?,?,?)';
    let insertValues = [req.body.email, req.body.password, req.body.create_time, req.body.age, req.body.name, req.body.country];     
    let sqlQuery = sql.format(insertQuery, insertValues);

    // execute the sql POST query
    sql.query(sqlQuery,  function (error, result) {       
        res.setHeader('Content-Type', 'application/json');       
        if (error) return handleError(res, error);   
        res.end(JSON.stringify(result)); 
    });
    console.log(sqlQuery);
});

router.get('/', (req, res, next) => {
    
    // Create the sql that returns all users     
    // If a specific query parameter is specified, return specific users in a specific way

    /*  Test
    GET:  http://localhost:5000/api/users?country=denmark
    GET:  http://localhost:5000/api/users?age=31
    GET:  http://localhost:5000/api/users?sort=name&order=asc
    GET:  http://localhost:5000/api/users?min-age=29&max-age=31
    GET:  http://localhost:5000/api/users?email=benjamin@hyf.dk 

    GET:  http://localhost:5000/api/users?country=USA&min-age=29&max-age=40
    GET:  http://localhost:5000/api/users?country=denmark&age=11
    GET:  http://localhost:5000/api/users?sort=name&order=desc
    GET:  http://localhost:5000/api/users?age=31&sort=name&order=asc   
    GET:  http://localhost:5000/api/users?age=31&sort=password&order=desc
   */  
    const separators = ['-', '_'];  // string separators           
    const queryParamArray = ['sort', 'order', 'min', 'max', 'limit'];  // query clause/conditions - lookup array
    const intParamsArray = ['age'];     // Integer data type - lookup array 
    let queryParams = "";       // sql query parameter
    let queryParamValues = [];  // sql query parameter values (i.e attributes (??) + values (?) array )   
    let queryKeyVal;    
    let selectQuery;
    let sqlQuery;    

     // query parameters
    console.log(req.query);

    if (Object.keys(req.query).length > 0 ) {
        /* sql that return specific users in a specific way */

        Object.keys(req.query).forEach(key => {                
            // split request query if containing the separator ('-' or '_') and returns an array 
            // e.g 'min-age/min_age' = [ 'min', 'age' ] 
            let queryObjectKey =  key.toLowerCase().split(new RegExp(separators.join('|'), 'g'));                     
            // check if request query contains 'WHERE clause'            
            let IsWhereClause = queryParamArray.includes(queryObjectKey[0]) ? false : true;           
            
            // build the SQL SELECT query string..
            if (IsWhereClause) {
                // the 'WHERE' clause parameter               
                queryParams = !queryParams.length ? `${queryParams} WHERE ?? = ?` : `${queryParams} AND ?? = ?`;                 
                
                // find and convert number parameters to integer type (e.g 'age')
                queryKeyVal = intParamsArray.includes(queryObjectKey[0]) ? parseInt(req.query[key])  : req.query[key] ;               
                queryParamValues.push(queryObjectKey[0], queryKeyVal);   // add to query parameter values array   
                
            } else if (queryObjectKey[0] === 'sort') {
                // the 'ORDER BY' clause parameter. (queryObjectKey = [ 'sort' ])
                queryParams = `${queryParams} ORDER BY ??` ;
                queryParamValues.push(req.query[key]);           

            } else if (queryObjectKey[0] === 'order') {              
                // 'sort' condition: ASC or DESC. (queryObjectKey = [ 'order' ])
                queryParams = `${queryParams} ${req.query[key].toUpperCase()}`;
                
            } else if (queryObjectKey[0] === 'min') { 
                // 'min' condition. (queryObjectKey = [ 'min', 'age' ])
                queryParams = !queryParams.length ? `${queryParams} WHERE ?? >= ?` : `${queryParams} AND ?? >= ?`; 
                // find and convert number parameters to integer type (e.g 'age')
                queryKeyVal = intParamsArray.includes(queryObjectKey[1]) ? parseInt(req.query[key]) : req.query[key] ;               
                queryParamValues.push(queryObjectKey[1], queryKeyVal);    // add to query parameter values array   
                        
            } else if (queryObjectKey[0] === 'max') { 
                // 'max' condition. (queryObjectKey = [ 'max', 'age' ])
                queryParams = !queryParams.length ? `${queryParams} WHERE ?? <= ?` : `${queryParams} AND ?? <= ?`; 
                // find and convert number parameters to integer type (e.g 'age') 
                queryKeyVal = intParamsArray.includes(queryObjectKey[1]) ? parseInt(req.query[key]) : req.query[key] ;               
                queryParamValues.push(queryObjectKey[1], queryKeyVal);   // add to query parameter values array                
            } 
                         
        });
        // SELECT query that returns specific users in a specific way: 
        //attach WHERE, ORDER BY clauses and conditions to SELECT query
        selectQuery = `SELECT * FROM users ${queryParams}`;
        sqlQuery = sql.format(selectQuery, queryParamValues);  // attach the respective parameter values
        
    } else {
        // SELECT query that returns all users    
        sqlQuery = 'SELECT * FROM users';            
    }     
       // execute the sql SELECT query   
    sql.query(sqlQuery, function (error, result) {
        res.setHeader('Content-Type', 'application/json');
        if (error) return handleError(res, error);
        res.end(JSON.stringify(result));       
    }); 
    console.log(sqlQuery);           
}); 

router.get('/:email', (req, res, next) => {
    // Create the sql that returns a specific user matching the email

    // get the email after api/users/some-email:
    /* Test
    GET:  http://localhost:5000/api/users/benjamin@hyf.dk
    GET:  http://localhost:5000/api/users/John_doe@hyf.dk
    */
    // request parameters
    console.log(req.params.email);

    // build the sql SELECT query string
    let selectQuery = 'SELECT * FROM users WHERE email = ?';
    let sqlQuery = sql.format(selectQuery, [req.params.email]);
    // execute the sql SELECT query   
    sql.query(sqlQuery, function (error, result) {
        res.setHeader('Content-Type', 'application/json');
        if (error) return handleError(res, error);
        res.end(JSON.stringify(result));       
    }); 
    console.log(sqlQuery);
});

router.put('/:email', (req, res, next) => {
    // Create the sql that updates information about a user matching the email    
    /* Test
    PUT:  http://localhost:5000/api/users/benjamin@hyf.dk
    {
        "age": 29,
        "password": "ben1234"
    }
    PUT:  http://localhost:5000/api/users/asda
    {
        "age": 19,
        "password": "stu1234",
        "name": "Stuart"
    }
    */
    // body requests
    console.log(req.body);
    // request parameters
    console.log(req.params.email);   

    let setParams = "";
    let setParamsValues = [];
       
    if (Object.keys(req.body).length > 0 ) {   
       // build SET clause      
        Object.keys(req.body).forEach(key => {              
            setParams = !setParams.length ? `?? = ?` : `${setParams}, ?? = ?`;
            setParamsValues.push(key, req.body[key]) ;             
        });        
    }    
    
    if (req.params) {
        // WHERE clause        
        setParams = `${setParams} WHERE ?? = ?`;
        setParamsValues.push('email', req.params.email) ; 
    }
    // build the sql UPDATE query string..
    let updateQuery = `UPDATE users SET ${setParams}`;  // "UPDATE user SET ?? = ? WHERE ?? = ?";
    let sqlQuery = sql.format(updateQuery, setParamsValues);

    // execute sql UPDATE query   
    sql.query(sqlQuery, function (error, result) {
        res.setHeader('Content-Type', 'application/json');
        if (error) return handleError(res, error);
        res.end(JSON.stringify(result));       
    }); 
    console.log(sqlQuery);
});

router.delete('/:email', (req, res, next) => {
    // Create the sql that removes the user matching the email
    /* Test
     DELETE:  http://localhost:5000/api/users/John_doe@hyf.dk
    */
    // request parameters
    console.log(req.params.email);  

    // build the sql DELETE query string
    let delQuery = 'DELETE FROM users WHERE email = ?';
    let sqlQuery =  sql.format(delQuery, req.params.email);
   
    // execute sql DELETE query   
    sql.query(sqlQuery, function (error, result) {
        res.setHeader('Content-Type', 'application/json');
        if (error) return handleError(res, error);
        res.end(JSON.stringify(result));       
    });     
    console.log(sqlQuery);
});


module.exports = router;
