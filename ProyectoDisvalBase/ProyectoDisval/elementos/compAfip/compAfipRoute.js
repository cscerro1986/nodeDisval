
const express = require("express");
const router = express.Router();
const fileUpload = require("../utils/handleStorage")
const {getAllCompro , addNewComprobanteAfip, cargarArchivo} = require("./compAfipController");

router.get("/",getAllCompro);
router.post ("/",addNewComprobanteAfip)
router.post("/cargarArchivo",fileUpload.single("prueba"),cargarArchivo)

module.exports = router;