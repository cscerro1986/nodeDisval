const jwt = require("jsonwebtoken");

const jwtSecret = process.env.jwt_secret;

//generar el token al iniciar sesion

const tokenSing = async (user) =>{
    const token = jwt.sign(user,jwtSecret,{expiresIn: '1h'});
    return token;
}

const verifyToken = async(token)=>{
    try {
        const verificacion = jwt.verify(token,jwtSecret);
    } catch (error) {
        return error;
    }
}

module.exports ={tokenSing,verifyToken}