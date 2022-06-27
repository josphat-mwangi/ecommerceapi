const router = require('express').Router();
const Cartegory = require('../models/Category');
const authVerify = require('../middlewares/authVerify');
const {categoryValidation} =  require('../validations/categoryvadalidation');

//getting all cartegory
router.get('/', async(req, res)=>{
    
    try{
        const category = await Cartegory.find();
        return res.send(category)
    }catch(err){
        res.send( err)
    }
})

//getting a specific category
router.get('/:cartegoryId', async(req, res)=>{
    try{
        const category = await Cartegory.findById(req.params.cartegoryId);
        res.json(category);
    }catch(err){
        res.json({msg: err})
    }
})

//deleting category
router.delete('/:cartegoryId', async(req, res)=>{
    try{
        const cartegoryRemove = await Cartegory.deleteOne({
            _id: req.params.cartegoryId
        });
        res.json(cartegoryRemove);
    }catch(err){
        res.send({msg: err})
    }
})

//updating cartegory
router.patch('/:cartegoryId', async(req, res)=>{
    try{
        const updateCartegory = await Cartegory.updateOne({
            _id: req.params.cartegoryId
        }, {$set: {name: req.body.name}});
        res.json(updateCartegory)
    }catch(err){
        res.send({msg: err})
    }
})

//post cartegory
router.post('/',  async(req, res)=>{
    //validating user inputs
    const {error} = categoryValidation(req.body)
    // if error exists then send back error
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const category = new Cartegory({
        name: req.body.name,
        createdby: req.body.createdby
    })

    const savedCategory = await category.save();
    try{
        res.json(savedCategory);
    }catch(err){
        res.json({msg: err})
    }  
})


module.exports = router;