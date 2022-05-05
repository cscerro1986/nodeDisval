
const express = require("express");
const router = express.Router();
const {getRoles, addNewRol} = require("../rol/rolController");
router.get("/",getRoles);
router.post("/",addNewRol);

module.exports =router;