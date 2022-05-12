
const {getAllComproDB , addNewComprobanteAfipDB, getComproAfipByParameters} = require("./compAfipModel")
const csv = require('csv-parser')
const fs = require('fs')

const getAllCompro = async (req, res, next)=>{
    
    let dbResponse = null;
    let laQueri={};
    req.query.fechaEmision ? laQueri.fechaEmision = req.query.fechaEmision : laQueri.fechaEmision="";
    req.query.tipo ? laQueri.tipo= req.query.tipo : laQueri.tipo ="";
    req.query.puntoDeVenta ? laQueri.puntoDeVenta = req.query.puntoDeVenta : laQueri.puntoDeVenta ="";
    req.query.numeroDesde ? laQueri.numeroDesde = req.query.numeroDesde : laQueri.numeroDesde ="";
    req.query.numeroDocumentoEmisor ? laQueri.numeroDocumentoEmisor = req.query.numeroDocumentoEmisor : laQueri.numeroDocumentoEmisor="";
    req.query.denominacionEmisor ? laQueri.denominacionEmisor = req.query.denominacionEmisor : laQueri.denominacionEmisor ="";
    req.query.netoGravado ? laQueri.netoGravado = req.query.netoGravado : laQueri.netoGravado ="";
    req.query.netoNoGravado ? laQueri.netoNoGravado = req.query.netoNoGravado : laQueri.netoNoGravado ="";
    req.query.exento ? laQueri.exento = req.query.exento : laQueri.exento="";
    req.query.iva ? laQueri.iva = req.query.iva :  laQueri.iva ="";
    req.query.total ? laQueri.total = req.query.total : laQueri.total ="";


    if(req.query.fechaDeEmision || req.query.tipo || req.query.puntoDeVenta || req.query.numeroDesde || req.query.numeroDocumentoEmisor
        ||req.query.denominacionEmisor || req.query.netoGravado || req.query.netoNoGravado || req.query.exento ||req.query.iva || req.query.total)
    {
        
        dbResponse = await getComproAfipByParameters(laQueri);
        res.status(200).json(dbResponse)
        return;
    }

    dbResponse = await getAllComproDB();
    if(dbResponse instanceof Error) res.send()

    res.status(200).json(dbResponse);

}

const getComproAfipByParameter = async( req, res, next)=>{
    try {
       const dbResponse = await getComproAfipByParameters(req.query);
       if(dbResponse instanceof Error) console.log("Error en la puta base");
       res.json(dbResponse);
    } catch (error) {
        
    }
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
        const algo = await UploadCsvDataToMySQL("C:/Users/Santiago/Documents/Disval/nodeDisval/ProyectoDisvalBase/ProyectoDisval/elementos/storage/" + req.file.filename);
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

module.exports = {getAllCompro, addNewComprobanteAfip, cargarArchivo, getComproAfipByParameter};