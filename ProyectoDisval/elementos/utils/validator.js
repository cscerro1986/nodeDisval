const { query } = require("express");
const express = require("express");
const pool = require("../database/config");

const emailExistente = async(req, res, next)=>{
    const email = req.body.email;
    const query = "SELECT * FROM users WHERE email = ?";
    console.log(email);
    try {
        const dbRespose =await pool.query(query,email);
        if(dbRespose.length)
        {
            console.log("Entro al response");
            res.status(401).json(Message="email ya registrado");
        }
        next();
    } catch (error) {
        console.log(error);
        
    }
}

const usernameExists = async(req, res, next)=>{
    const username = req.body.username;
    const query = "SELECT * FROM users WHERE username = ?";
    console.log(username);
    try {
        const dbRespose =await pool.query(query,username);
        if(dbRespose.length)
        {
            console.log("Entro al response");
            res.status(401).json(Message="Username ya registrado, pruebe con otro");
        }
        next();
    } catch (error) {
        console.log(error);
        
    }
}



module.exports = {emailExistente, usernameExists};