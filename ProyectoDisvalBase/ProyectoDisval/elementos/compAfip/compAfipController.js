
const {getAllComproDB , addNewComprobanteAfipDB} = require("./compAfipModel")
const csv = require('csv-parser')
const fs = require('fs')
const getAllCompro = async (req, res, next)=>{
    
    const dbResponse = await getAllComproDB();
    if(dbResponse instanceof Error) res.send()

    res.status(200).json(dbResponse);

}

const addNewComprobanteAfip = async (req, res, next)=>{
    const dbResponse = await addNewComprobanteAfipDB({...req.body});
    if(dbResponse instanceof Error)
    {   
        if(dbResponse.code ==="ER_DUP_ENTRY")
        res.status(400).json({message:"Comprobante duplicado"});

        res.json("No se pudo");
    } 
    res.status(200).json({message: "Comprobante cargado correctamente"});
}

const cargarArchivo = async (req, res, next)=>
{
    console.log("Entro a cargar arhicvo")
    try {
        await UploadCsvDataToMySQL("C:/Users/csc/Documents/PROGRAMACION 06-07/Node/apiDisval/nodeDisval/ProyectoDisvalBase/ProyectoDisval/elementos/storage/" + req.file.filename);
        console.log('CSV file data has been uploaded in mysql database ');
        
    } catch (error) {
        
    }
}

async function UploadCsvDataToMySQL(filePath)
{
    let results=[];
    fs.createReadStream(filePath)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', () => { 
        results.forEach(element=>{ addNewComprobanteAfipDB(element); })
  });
  
}

module.exports = {getAllCompro, addNewComprobanteAfip, cargarArchivo};