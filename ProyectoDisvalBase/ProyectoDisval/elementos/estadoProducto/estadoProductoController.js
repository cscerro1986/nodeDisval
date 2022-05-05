
const {getAllEstadoProductoDB, addNewEstadoProductoDB} = require("./estadoProductoModal");

const getAllEstadoProducto = async(req, res, next)=>{
    try {
        const dbResponse = await getAllEstadoProductoDB();
        if(dbResponse instanceof Error) res.status(400).json({message:"Me trajo un fucking error"});

        if(dbResponse.legth) res.status(400).json({message: "me trajo un array vacio... o sea no hay nada"});

        res.status(200).json(dbResponse);
    } catch (error) {
        res.status(400).json({message:"Ocurrio un error en la consulta"});
    }
}
            
const addNewEstadoProducto = async(req, res, next)=>{
    try {
        const dbResponse = await addNewEstadoProductoDB({...req.body});
        res.status(200).json({message:`Estado Producto cargado exitosamente: ${req.body.EstadoProducto}`});
    } catch (error) {
        res.status(400).json("No se pudo carga el producto");
    }
}



module.exports = {getAllEstadoProducto, addNewEstadoProducto};