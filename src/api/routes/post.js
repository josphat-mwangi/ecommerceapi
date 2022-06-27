const router = require("express").Router();
const Product = require("../models/Post");
const authVerify = require("../middlewares/authVerify")
const { postValidation } = require("../validations/postvalidation");
const { default: mongoose } = require("mongoose");



//get all products
router.get("/", async(req, res)=>{
    try{
        const product = await Product.find()
        res.json(product)
    }catch(err){
        res.json({msg: err})
    }
});


//getting single product
router.get("/:productId", async(req, res)=>{
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
})


//update product
router.patch("/:productId", async(req, res)=>{
    try{
        const updates = req.body;
        const product = await Product.updateMany(
            {
            _id: req.params.productId
            }, 
            {
               updates
            }
            
        );
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
})


//create product
router.post('/', async(req, res)=>{
    //validating user inputs
    const {error} = postValidation(req.body);

    // if error exists then send back error
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const newProduct = new Product({
        ...req.body
    })
    try{
        const saveProduct = await newProduct.save();
        res.json(saveProduct)
    }catch(err){
        res.json({message: err})
    }

});

//deleting a product
router.delete("/:productId", async(req, res)=>{
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
})


module.exports = router;