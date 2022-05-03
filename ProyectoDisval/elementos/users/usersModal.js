const pool = require("../database/config");

//GET ALL
const getAllUsersDB = async ()=>{
    const query = "SELECT * FROM users";
    try {
        const dbResponse = await pool.query(query);
        return dbResponse;
        
    } catch (error) {
        error.message = error.code;
        return error;
    }
}

//GET ONE
const getUserDBbyId =async (id)=>{
    const query = "SELECT * FROM users WHERE id = ?";
    try {
        const dbResponse = await pool.query(query,id);
        return dbResponse;
        
    } catch (error) {
        error.message = error.code;
        return error;
    }  
}




//CREATE
const registerNewUserDB = async (usuario)=>{
    const query = "INSERT INTO users SET ?";
    try {
        console.log("Entro al registerNewUserDB")
        const dbResponse = await pool.query(query,usuario);
        
        return dbResponse;
        
    } catch (error) {
        error.message = error.code
        console.log(error)
        return error
    }
}

//DELETE
const deleteUserDBbyID = async(id)=>
{
    const query ="DELETE FROM users where id = ?";
    try {
        const dbResponse = await pool.query(query,id);
        return dbResponse;
    } catch (error) {
        error.message = error.code;
        return error;
    }
}



//UPDATE
const updateUserDBbyID = async(user, id)=>
{
    const query =`UPDATE FROM users SET ? WHERE id = ${id}`;
    try {
        const dbResponse = await pool.query(query,id);
        return dbResponse;
    } catch (error) {
        error.message = error.code;
        return error;
    }
}

const loginUserDB = async(email)=>{
    // const query2= "SELECT * FROM users WHERE id = ?";
    const query = "SELECT * FROM users WHERE email = ?";
    try {
        const dbResponse = await pool.query(query,email);
        return dbResponse;
        
    } catch (error) {
        error.message= error.code;
        console.log(error);
    }
}




module.exports = {getAllUsersDB, registerNewUserDB, getUserDBbyId, updateUserDBbyID, deleteUserDBbyID , loginUserDB};