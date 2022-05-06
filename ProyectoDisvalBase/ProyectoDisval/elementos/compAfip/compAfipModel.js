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



module.exports = {getAllComproDB, addNewComprobanteAfipDB};