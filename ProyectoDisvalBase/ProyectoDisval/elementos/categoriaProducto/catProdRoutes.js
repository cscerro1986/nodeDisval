const express = require("express");
const router = express.Router();

const {getAllCatProd,addCatProd} = require("./catProdController");

router.get("/",getAllCatProd);
router.post("/",addCatProd);

module.exports = router;