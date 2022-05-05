const pool = require("../database/config");

const getRolesDB = async()=>{
    const query = "SELECT * FROM rol"
    try {
        console.log("Entro al getRolesDB");
        const dbResponse = await pool.query(query);
        console.log("El dbResponse en el modal es: ",dbResponse);
        return dbResponse;
        
    } catch (error) {
        
    }
}

const addNewRolDB = async(rol)=>{
    console.log("El rol es",rol);
    const query = "INSERT INTO rol SET ?";
    try {
        const dbResponse =  pool.query(query,rol);
        return dbResponse;
    } catch (error) {
        error.mesage = error.code;
    }
}

module.exports = {getRolesDB, addNewRolDB}