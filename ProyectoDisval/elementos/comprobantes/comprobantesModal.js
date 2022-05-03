const database = require(".../database/config");
const {getAllUser}= require("./comprobantesController");
const express = require("express");
const router =express.Router();

router.get("/",getAllUser);

module.exports = {router};