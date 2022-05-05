const {getAllProductsDB, addNewProductDB, getProductByIdDB, getProductsByEstateDB} = require("./productosModel");

const getAllProducts = async (req,res,next)=>{
    try {
        const dbResponse= await getAllProductsDB();
        if(dbResponse instanceof Error) res.status(400).json({message:"Se produjo un error en el modale"});

        res.status(200).json(dbResponse);

    } catch (error) {
        res.status(401).json(error);
    }
}

const getProductByID = async (req,res, next)=>{

}

const getProductsByEstate = async(req, res, next)=>{

}

module.exports ={getAllProducts, getProductByID, getProductsByEstate};