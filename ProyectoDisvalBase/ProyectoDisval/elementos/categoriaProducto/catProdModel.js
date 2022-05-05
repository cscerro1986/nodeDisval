const pool = require("../database/config");

//GET ALL
const getAllCatProdDB = async ()=>{
    const query = "SELECT * FROM categoriaproducto";
    try {
        const dbResponse = await pool.query(query);
        return dbResponse;
        
    } catch (error) {
        error.message = error.code;
        return error;
    }
}

const addCatProdDB = async(cat) =>{
    const query ="INSERT INTO categoriaproducto SET ?";
    try {
        const dbResponse = await pool.query(query,cat);
        return dbResponse;
    } catch (error) {
        error.message= error.code;
        return error;
    }
}



module.exports = {getAllCatProdDB, addCatProdDB};