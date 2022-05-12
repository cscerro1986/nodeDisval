const req = require("express/lib/request");
const multer = require("multer");

const storage = multer.diskStorage({
        
        destination: (req, file, callback) => {
            console.log("Estoy en el storage")
            // const pathStorage = `${__dirname}'/../storage`;
            const pathStorage = "C:/Users/Santiago/Documents/Disval/nodeDisval/ProyectoDisvalBase/ProyectoDisval/elementos/storage";
            console.log(pathStorage);
            callback(null, pathStorage)
        },
        filename: (req, file, callback) => {
            const ext = file.originalname.split(".").pop()
            const fileName = `img-${Date.now()}.${ext}`
            // callback(null, fileName)
            callback(null, file.originalname)
        }
    })
    //creamos el middleware
const fileUpload = multer({ storage })
module.exports = fileUpload