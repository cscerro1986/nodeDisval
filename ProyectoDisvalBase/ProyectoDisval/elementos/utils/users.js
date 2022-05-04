const {check,validationResult} = require('express-validator');

const validatorCreateUser = [
    check("name")
    .trim()
    .notEmpty().withMessage("Todos los campos son requeridos")
    .isAlpha('es-ES',{ignore:' '}).withMessage("solo se admiten letras")
    .isLength({min:2 , max:30}).withMessage("Solo letras min:2 max:30"),
    check("email")
    .trim()
    .exists().withMessage("Campo email es requerido")
    .isEmail().withMessage("Debe ser un formato valido de email")
    .normalizeEmail(),
    check("username")
    .notEmpty()
    .isAlpha('es-ES',{ignore:' '}).withMessage("solo se admiten letras")
    .isLength({min:2 , max:30}).withMessage("Solo letras min:2 max:30"),
    check("password")
    .exists()
    .trim()
    .notEmpty().withMessage("Contraseña requerida")
    .isLength({min: 8, max:20}).withMessage("Contraseña debe tener entre 8 y 20 caracteres"),
    check("rol")
    .isNumeric().withMessage("El rol debe ser numerico")
    .default(3)
    .notEmpty(),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }
        return next();
    }

]


module.exports = { validatorCreateUser }