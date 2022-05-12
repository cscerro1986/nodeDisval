const pool = require("../database/config");

const getAllComproDB = async ()=>{
    const query = "SELECT * FROM comprobanteafip";
    try {
        const dbResponse = await pool.query(query);
        
        return dbResponse;
    } catch (error) {
        error.message = error.code;
        return error;
    }
}


const getComproAfipByParameters = async(compro)=>{
    const query =`SELECT * FROM comprobanteafip WHERE fechaEmision LIKE '%${compro.fechaEmision}%'
    AND tipo LIKE '%${compro.tipo}%' 
    AND puntoDeVenta LIKE '%${compro.puntoDeVenta}%'
    AND numeroDesde LIKE '%${compro.numeroDesde}%'
    AND numeroDocumentoEmisor LIKE '%${compro.numeroDocumentoEmisor}%'
    AND denominacionEmisor LIKE '%${compro.denominacionEmisor}%'
    AND netoGravado LIKE '%${compro.netoGravado}%'
    AND netoNoGravado LIKE '%${compro.netoNoGravado}%'
    AND exento LIKE '%${compro.exento}%'
    AND iva LIKE '%${compro.iva}%'
    AND total LIKE '%${compro.total}%'`;
    console.log(query);

    try {
        const dbResponse = await pool.query(query);
        console.log(dbResponse);
        return dbResponse;
    } catch (error) {
        error.message = error.code;
        console.log("Entro al error ",error);
        return error;
    }
}


const addNewComprobanteAfipDB = async (compro)=>{
    const query = "INSERT INTO comprobanteafip SET ?";
    try {
        const dbResponse = await pool.query(query,compro);
        console.log(dbResponse);
        return dbResponse;
    } catch (error) {
        error.message = error.code;
        console.log("Entro al error ",error);
        return error;
    }
}

module.exports = {getAllComproDB, addNewComprobanteAfipDB, getComproAfipByParameters};