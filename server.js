const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 4000;
const mysql = require('mysql');
//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});


const mysqlConnection = mysql.createConnection({
host: '10.9.3.218',
user: 'TWStudent',
password: 'TechWorks!',
database: 'employeedb',
multipleStatements: true
});

mysqlConnection.connect(err => {

  if(!err)console.log('DB connection succeeded')
  else{
    console.log("DB connection failed Error:" + JSON.stringify(err, undefined, 2)
    );

  }
});


app.get('/employee/:id', (req, res) =>  {

  mysqlConnection.query('SELECT * FROM Employee WHERE EmpID =?', [req.params.id],
  (err, rows, field) =>{

    if(!err) res.send(rows);
    else console.log(err);
  });
});

app.delete('/employee/:id', (req, res) =>  {

  mysqlConnection.query(
    'DELETE * FROM Employee WHERE EmpID =?', [req.params.id],
  (err, rows, field) =>{

    if(!err) res.send("DELETED Employees");
    else console.log(err);
  });
});



// app.get('/api/students', (req, res) => {
//   const students = [
//     { id: 1, firstName: 'Captain', lastName: 'fancy' },
//     { id: 2, firstName: 'John', lastName: 'buttercup' },
//     { id: 3, firstName: 'Dusty', lastName: 'Trail' },
//   ];
//   res.json(students);
// });

