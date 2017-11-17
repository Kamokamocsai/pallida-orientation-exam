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
      });
    } else {
      res.send({ status: 'error', message: 'invalid input' });
    }
  });

// app.get('/all', function(req, res) {
//     conn.query('SELECT book_name, aut_name, cate_descrip, pub_name,\
//                 book_price FROM book_mast\
//                 JOIN author ON author.aut_id=book_mast.aut_id\
//                 JOIN category ON book_mast.cate_id=category.cate_id \
//                 JOIN newpublisher ON book_mast.pub_id=newpublisher.pub_id', 
//                 function(error, rows){
//         if(error) {
//             console.log(error.toString());
//         }
//         let htmlString = '<tr>';
//         rows.forEach(function(row) {
//             htmlString = htmlString + `<tr><td>${row.book_name}</td>
//                                       <td>${row.aut_name}</td>
//                                       <td>${row.cate_descrip}</td>
//                                       <td>${row.pub_name}</td>
//                                       <td>${row.book_price}</td>
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