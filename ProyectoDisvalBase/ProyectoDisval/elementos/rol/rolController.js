const {getRolesDB, addNewRolDB} = require("../rol/rolModal");

const getRoles = async(req,res,next)=>{
    try {
        console.log("Entro al getRoles")
        const dbResponse = await getRolesDB();
        console.log("El length es de :",dbResponse);
        if(dbResponse instanceof Error)
        {
            console.log("Tiene que entrar al if del error ahora")
            res.status(400).json("Otro error");
        }
        console.log(dbResponse);
        res.send(dbResponse);
    } catch (error) {
        
    }
}

const addNewRol = async (req, res, next)=>{
    const descripcion = req.body.descripcion;
    try {
        const dbResponse = await addNewRolDB({...req.body});
        res.status(200).json({message:`Nuevo rol creado exitosamente: ${descripcion}`});
        
    } catch (error) {
        res.status(400).json("no se pudo agregar nada papa!!");
    }
}



module.exports = {getRoles, addNewRol};
