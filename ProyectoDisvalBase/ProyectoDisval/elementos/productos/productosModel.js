const pool = require("../database/config");

const getAllProductsDB = async()=>{
    const query = "SELECT * FROM producto";
    try {
        const dbResponse = await pool.query(query);
        return dbResponse;
    } catch (error) {
        error.message=error.code;
        return error;
    }
}

const addNewProductDB = async (product)=>{
    const query="INSERT INTO producto SET ?";
    try {
        const dbResponse = await pool.query(query,product);
        return dbResponse;
    } catch (error) {
        error.message = error.code;
        return error;
    }
}

const getProductByIdDB = async (id)=>{
    const query = "SELECT * FROM producto WHERE id = ?";
    try {
        const dbResponse = await pool.query(query,id);
        return dbResponse;
    } catch (error) {
        error.message = error.code;
        return error;
    }
}

const getProductsByEstateDB


module.exports ={getAllProductsDB, addNewProductDB, getProductByIdDB, getProductsByEstateDB}