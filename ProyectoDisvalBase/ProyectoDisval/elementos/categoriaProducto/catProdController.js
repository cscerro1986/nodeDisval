const {getAllCatProdDB, addCatProdDB} = require("./catProdModel");

const getAllCatProd = async(req, res, next)=>{
    try {
        const dbResponse = await getAllCatProdDB();
        res.status(200).json(dbResponse);
    } catch (error) {
        error.message = error.code;
        return error;
    }
}


const addCatProd = async( req, res, next)=>{
    const query = "INSERT INTO categoriaproducto SET ?";

    try {
        const dbResponse = await addCatProdDB({...req.body});
        console.log(dbResponse);
        if(dbResponse instanceof Error) res.send("Este es un maldito error");
        res.status(200).json({message:`Categoria ingresada correctamente: ${req.body.NombreProducto}`});
    } catch (error) {
        res.send("Se rompio el try catch");
    }
}

module.exports ={getAllCatProd, addCatProd}