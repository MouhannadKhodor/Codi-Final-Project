//Validation
const Joi = require('@hapi/joi');

//Registration validation

const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }); 

       //validation
    return schema.validate(data);
    
    
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }); 

       //validation
    return schema.validate(data);
    
    
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;