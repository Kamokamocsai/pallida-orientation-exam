'use strict';

let express = require('express');
let app = express();

let mysql = require("mysql");
let validator = require('./assets/validator');


let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gameskami",
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

// app.get('/search/:brand', function(req, res) {
//     conn.query('SELECT car_brand car_model color year FROM licence_plates', function(error, rows){
//         if(error) {
//             console.log(error.toString());
//         }
//         let htmlString = '<tr>';
//         rows.forEach(function(row) {
//             htmlString = htmlString + `<tr><td>${row.car_brand}</td>
//                                       <td>${row.car_model}</td>
//                                       <td>${row.color}</td>
//                                       <td>${row.year}</td>
//                                       </tr>`;
//         });
//         htmlString = htmlString + '</tr>';
//         res.send(htmlString)
//         });
// });

app.get('/search', function(req, res) {
  let searchParam = Object.keys(req.query)[0]
  let searchValue = req.query[searchParam]
  let data = []
  conn.query('SELECT * FROM licence_plates WHERE ' +searchParam +"="+ searchValue, function(error, result, fields){
      if(error) {
          console.log(error.toString());
      }
      result.forEach(function(element) {
        data.push(element.searchValue);
      });
      res.send(data);      
})});


conn.connect(function(err){
  if(err){
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});


app.listen(3000, () => console.log('Server is running...'));