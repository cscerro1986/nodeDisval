
const { body } = require("express-validator");
const pool = require("../database/config");

const getAllEstadoProductoDB = async()=>{
    const query = "SELECT * FROM estadoproducto";
    try {
        const dbResponse = await pool.query(query);
        return dbResponse;
    } catch (error) {
        error.message = error.code;
        return error;
    }
}

const addNewEstadoProductoDB = async(estado)=>{
    const query = "INSERT INTO estadoproducto SET ?";
    try {
        const dbResponse= await pool.query(query,estado);
        return dbResponse;
    } catch (error) {
        error.message = error.code;
        return error;   
    }
}



module.exports = {getAllEstadoProductoDB, addNewEstadoProductoDB};