const fs = require("fs");
fs.readFile("C:/Users/csc/Documents/prueba.csv", "utf-8", (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});