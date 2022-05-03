const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('pruebaWeb2.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {

    let htmlContent = "";
    results.forEach(el => {
      htmlContent += `<div>ID: ${el.Numero} - Title: ${el.Cuenta}</div><br/>`;
    });
    dataContainer.innerHTML = htmlContent;

    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });


 