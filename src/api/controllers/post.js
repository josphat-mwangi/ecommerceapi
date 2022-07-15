const Product = require("../models/Post");
const { postValidation } = require("../validations/postvalidation");
const mongoose  = require("mongoose");



//get all products
const getAllproducts = async(req, res)=>{
    try{
        const product = await Product.find()
        return res.json(product)
    }catch(err){
        return res.json({msg: err})
    }
};


//getting single product
const getproduct = async(req, res)=>{
    try{
        const product = await Product.findById(req.params.productId);
        if(!product){
            res.status(400).json({
                msg: "Product does not exist"
            })
        }
        res.status(200).json(product)
    }catch(err){
        if (err instanceof mongoose.CastError){
            res.status(400).json({
                msg: 'Invalid Product Id'
            })
        }
        res.status(400).json({
            msg: err
        })
    }
};


//update product
const editproduct =  async(req, res)=>{
    
    try{
        const updateProduct = await Product.updateMany({
            _id: req.params.productId
        }, {$set: req.body});
        if(!updateProduct){
            res.status(400).json({
                msg: "Product does not exist"
            })
        }
        res.json(updateProduct)
    }catch(err){
        res.send({msg: err})
    }
};


//create product
const addProduct = async(req, res)=>{
    //validating user inputs
    const {error} = postValidation(req.body);

    // if error exists then send back error
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const owner = req.user.user_id
    const newProduct = new Product({
        ...req.body,
        author:  owner
    })

    try{
        const saveProduct = await newProduct.save();
        res.json(saveProduct)
    }catch(err){
        res.json({message: err})
    }

};

//deleting a product
const deleteProduct =  async(req, res)=>{
    const id = req.params.productId
    try{
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(400).json({
                msg: "Product does not exist"
            })
        }
        res.status(200).json(product)
    }catch(err){
        if (err instanceof mongoose.CastError){
            res.status(400).json({
                msg: 'Invalid Product Id'
            })
        }
        res.status(400).json({
            msg: err
        })
    }
};

module.exports = { getAllproducts, getproduct, deleteProduct, editproduct, addProduct}