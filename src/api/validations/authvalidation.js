const joi = require("@hapi/joi");


const registrationValidation = (data) =>{
    const schema = joi.object({
        username: joi.string().min(6).required(),
        email: joi.string().email().min(6).required(),
        password: joi.string().required().min(8),
        repeat_password: joi.string().valid(joi.ref('password')).required(),
        
    })

    return schema.validate(data)
}

const loginValidation = (data) =>{
    const schema = joi.object({
        email: joi.string().email().min(6).required(),
        password: joi.string().required().min(8),
    })

    return schema.validate(data)
}

module.exports.loginValidation = loginValidation;
module.exports.registrationValidation = registrationValidation;