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

const isAdmin = async(req,res,next)=>{
    const queryAdmin = "SELECT * FROM users where id =?";
    try {
        console.log("Entro al is admin",req.body);
        const user = await pool.query(queryAdmin, req.body.id);
        console.log("User: ",user);
        if(user[0].rol===1)
        {
            console.log("Entro al if")
            console.log(user[0].rol);
            next();
        }
        else{
            console.log("Entro al else")
            res.status(400).json(message="No tiene rol de administrador");
            
        }
        
    } catch (error) {
        
    }
    
}

const comprobanteAfipIGuales = (compro1, compro2)=>{
    if(compro1.tipo === compro2.tipo && compro1.fechaEmision===compro2.fechaEmision && compro1.numeroDesde ===compro2.numeroDesde &&compro1.total ===compro2.total)
    {
        return true;
    }
    return false;
}



module.exports = {emailExistente, usernameExists, isAdmin, comprobanteAfipIGuales};