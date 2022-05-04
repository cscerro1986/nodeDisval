const express = require('express');
const router =express.Router();
const {getAllUser , registerNewUser , getUserbyID, deleteUser , updateUser,loginUser} =require("./usersController");
const {emailExistente,usernameExists, isAdmin} = require("../utils/validator");
const { validatorCreateUser } = require("../utils/users");

router.get("/",isAdmin,getAllUser);
//uso 2 middleware.. valido los campos y que el mail no se encuentre registrado.
router.post("/",validatorCreateUser,usernameExists,emailExistente,isAdmin,registerNewUser);
router.get("/:id",getUserbyID);
router.post("/",validatorCreateUser,updateUser);
router.delete("/:id",deleteUser);
router.post("/login",loginUser)

module.exports=router;