const express = require("express");
const router = express.Router();
const {getAllEstadoProducto} = require("./estadoProductoController");
router.get("/",getAllEstadoProducto);
module.exports = router;