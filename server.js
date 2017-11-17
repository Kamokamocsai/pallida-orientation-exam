'use strict';

let express = require('express');
let app = express();

let mysql = require("mysql");
let validator = require('./assets/validator');


let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "licence_plate"
});

app.use('/', express.static('./assets'));
app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + './assets/index.html');    
});

app.get('/search', function (req, res) {
    if (true) { // validator.validator() volt az if-ben
      conn.query('SELECT * FROM licence_plates', function (err, tables) {
        if (err) {
            throw err;
        }
        let response = tables.map(function (row) {
            return row.car_brand;
        });
        res.send({ status: 'ok', car_brand: response });
        let htmlString = '<ul>';
        tables.forEach(function(row) {
            htmlString = htmlString + '<li>' + row.car_brand + '</li>';
        });
        htmlString = htmlString + '</ul>';
        res.send(htmlString)
      });
    } else {
      res.send({ status: 'error', message: 'invalid input' });
    }
  });

app.get('/color', function (req, res) {
    if (true) { // validator.validator() volt az if-ben
      conn.query('SELECT color FROM licence_plates', function (err, tables) {
        if (err) {
            throw err;
        }
        let response = tables.map(function (row) {
            return row.color;
        });
        res.send({ status: 'ok', car_color: response });
        let htmlString = '<ul>';
        tables.forEach(function(row) {
            htmlString = htmlString + '<li>' + row.color + '</li>';
        });
        htmlString = htmlString + '</ul>';
        res.send(htmlString)
      });
    } else {
      res.send({ status: 'error', message: 'invalid input' });
    }
  });

app.get('/search/:brand', function(req, res) {
    let data = [];
    let queryString = `SELECT * FROM licence_plates WHERE car_brand='${req.params.brand}'`;
    connection.query(queryString, function(err, result, fileds) {
        result.forEach(function(element){
        data.push({'licence': element.plate, 'brand': element.car_brand, 'model': element.car_model, 'year': element.year, 'color': element.color});
        });
        res.send({'result': 'OK', 'cars': data});
    });
});

// app.get('/search', function(req, res) {
//   let searchParam = Object.keys(req.query)[0]
//   let searchValue = req.query[searchParam]
//   let data = []
//   conn.query('SELECT * FROM licence_plates WHERE ' +searchParam +"="+ searchValue, function(error, result, fields){
//       if(error) {
//           console.log(error.toString());
//       }
//       result.forEach(function(element) {
//         data.push(element.searchValue);
//       });
//       res.send(data);      
// })});


conn.connect(function(err){
  if(err){
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});


app.listen(3000, () => console.log('Server is running...'));