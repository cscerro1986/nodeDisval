const csv = require('csv-parser')
const fs = require('fs')
const results = [];


const retornarArray = async(archivo)=>{
    console.log("Entro aca... Archivo: ",archivo)
    fs.createReadStream(archivo)
        .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
          console.log("Los resultados son ",results)        
          return results;
    });
}


module.exports ={retornarArray}


