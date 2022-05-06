const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('C:/Users/csc/Desktop/Analisis de cuentas/ArchivosAAgregar/2022-05-05b.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {        
    console.log(results);
  });


  const fs = require("fs");
  const mysql = require("mysql");
  const fastcsv = require("fast-csv");
  let stream = fs.createReadStream("bezkoder.csv");
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      // remove the first line: header
      csvData.shift();
      // create a new connection to the database
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456",
        database: "testdb"
      });
      // open the connection
      connection.connect(error => {
        if (error) {
          console.error(error);
        } else {
          let query =
            "INSERT INTO category (id, name, description, created_at) VALUES ?";
          connection.query(query, [csvData], (error, response) => {
            console.log(error || response);
          });
        }
      });
    });
    
  stream.pipe(csvStream);