const joi = require('@hapi/joi');


const postValidation = (data) =>{
    const schema = joi.object({
        productName: joi.string().required(),
        category: joi.string().required(),
        noOfItems: joi.number().integer().positive().required(),
        quantity: joi.string().required(),
        unitPrice: joi.number().integer().positive().required(),
        unitPriceCurrency: joi.string().required(),
       


    });

    return schema.validate(data)
}

module.exports.postValidation = postValidation;