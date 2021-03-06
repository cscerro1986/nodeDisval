
const express = require("express");
const router = express.Router();
const fileUpload = require("../utils/handleStorage")
const {getAllCompro , addNewComprobanteAfip, cargarArchivo, getComproAfipByParameter} = require("./compAfipController");

router.get("/",getAllCompro);
router.post ("/",addNewComprobanteAfip)
router.post("/cargarArchivo",fileUpload.single("archivo"),cargarArchivo)
router.get("/", getComproAfipByParameter);

module.exports = router;