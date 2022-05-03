
const {getAllUsersDB, registerNewUserDB, getUserDBbyId, updateUserDBbyID, deleteUserDBbyID, loginUserDB} = require("./usersModal");
const { hashPassword, checkPassword } = require("../utils/manejoContraseñas");
const {tokenSing,verifyToken} = require("../utils/manejoJWT");

const getAllUser = async(req, res,next)=>{
    
    const {authorization} = req.headers;
    console.log(req.headers);
    if(!authorization) return res.status(401).json({message:"No tiene autorizacion papa!"});
    try {
        const usuarios = await getAllUsersDB();
        if(usuarios instanceof Error)
        usuarios.error = error.message;
        res.send(usuarios);
        
    } catch (error) {
        
    }

}

// const getAllUser = async(req, res,next)=>{
//     try {
//         const usuarios = await getAllUsersDB();
//         if(usuarios instanceof Error)
//         usuarios.error = error.message;
//         res.send(usuarios);
        
//     } catch (error) {
        
//     }

// }

const getUserbyID = async(req, res)=>
{
    try {
    const id = +req.params.id;
    console.log("El id es:---> ",id);
    const dbResponse = await getUserDBbyId(id);
    if(dbResponse.length)
    {
        res.send(dbResponse);        
    }
    else
    {
        res.send({message:"No existe el usuario que busca"});
    }
    } catch (error) {
        error.message= error.code;
        return error;
    }
}

//REGISTER
const registerNewUser = async (req,res)=>{
    try {

        const password = await hashPassword(req.body.password);
        const dbResponse = await registerNewUserDB({...req.body,password });
        res.send(req.body);
    } catch (error) {
        console.log(error)
    }
}

//DELETE
const deleteUser = async (req,res)=>{
    try {
        const id = +req.params.id;
        const dbResponse = await deleteUserDBbyID(id);
        if(dbResponse.affectedRows===0)  res.send("No se pudo eliminaaaar");
        
        if(dbResponse.affectedRows!==0)
            res.send({message: `Usuario con id: ${id} eliminado satisfactoriamente`});
        
    } catch (error) {
        console.log(error);
    }
}

//UPDATE
const updateUser = async(req, res)=>{
    try {
        const id = +req.params.id;
        const dbResponse = updateUserDBbyID(id,{...req.body})
        if(dbResponse instanceof Error)
        {
            console.log(dbResponse);
        }
        else
        {
            res.send(req.body);
        }
    } catch (error) {
        error.message = error.code;
        console.log("El error del update es: ",error);

    }
}
const loginUser = async(req,res)=>{
    const dbResponse = await loginUserDB(req.body.email);
    console.log("El email es: ",dbResponse);
    const confirmaContraseña = await checkPassword(req.body.password, dbResponse[0].password);
    if(confirmaContraseña)  
    {
        const user =
        {
            id:dbResponse[0].id,
            name:dbResponse[0].name,
            username : dbResponse[0].username,
            rol: dbResponse[0].rol
        }
        const tokenData = {
            token: await tokenSing(user),
            user: user
        }
        res.status(200).json({ message: `User ${user.name} authorized `,jwk:tokenData});
    }
    else
    {
        res.send("Usuario o contraseños incorrectos, intente nuevamente");
    }
}

module.exports = {getAllUser , registerNewUser, getUserbyID, deleteUser , updateUser,loginUser};