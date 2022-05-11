
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
        const algo = await UploadCsvDataToMySQL("C:/Users/csc/Documents/PROGRAMACION 06-07/Node/apiDisval/nodeDisval/ProyectoDisvalBase/ProyectoDisval/elementos/storage/" + req.file.filename);
        console.log('CSV file data has been uploaded in mysql database ');
        res.send(algo);
    } catch (error) {
        
    }
}

async function UploadCsvDataToMySQL(filePath)
{
    const headers =(['fechaEmision','tipo','puntoDeVenta','numeroDesde','numeroHasta','codigoAutorizacion','tipoDocumento','numeroDocumentoEmisor','denominacionEmisor','tipoCambio','moneda','netoGravado','netoNoGravado','exento','iva','total']);
    let results=[];
    const algo= fs.createReadStream(filePath)
    .pipe(csv({ separator: ';',headers }))     
    .on('data', (data) =>{
        results.push(data)
        console.log("la dataaaaaaaaaaaaaaaaaaaa:",data)
    } )
    .on('end', () => { 
            results.forEach(element=>{ addNewComprobanteAfipDB(element); })
            console.log(results);
            return results;
  });


  
} 

module.exports = {getAllCompro, addNewComprobanteAfip, cargarArchivo};