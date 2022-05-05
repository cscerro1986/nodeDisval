const express = require("express");
const router = express.Router();

const {getAllProducts, getProductByID, getProductsByEstate} = require("./productosController");


router.get("/",getAllProducts);
router.get("/:id",getProductByID);
router.get("/estate/:id",getProductsByEstate);

module.exports = router;
