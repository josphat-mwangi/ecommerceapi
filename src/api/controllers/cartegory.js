const Cartegory = require('../models/Category');
const {categoryValidation} =  require('../validations/categoryvadalidation');

//getting all cartegory
const getAllCategory  = async(req, res)=>{
    try{
        const category = await Cartegory.find();
        return res.json(category)
    }catch(err){
        res.json( err)
    }
    
};

//getting a specific category
const getcategory = async(req, res)=>{
    try{
        const category = await Cartegory.findById(req.params.cartegoryId);
        res.json(category);
    }catch(err){
        res.json({msg: err})
    }
};

//deleting category
const deleteCategory =  async(req, res)=>{
    try{
        const cartegoryRemove = await Cartegory.deleteOne({
            _id: req.params.cartegoryId
        });
        res.json(cartegoryRemove);
    }catch(err){
        res.send({msg: err})
    }
};

//updating cartegory
const updateCategory =  async(req, res)=>{
    try{
        const updateCartegory = await Cartegory.updateOne({
            _id: req.params.cartegoryId
        }, {$set: {name: req.body.name}});
        res.json(updateCartegory)
    }catch(err){
        res.send({msg: err})
    }
};

//post cartegory
const addCategory = async(req, res)=>{
    //validating user inputs
    const {error} = categoryValidation(req.body)
    // if error exists then send back error
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const categoryName = await Cartegory.findOne({name:req.body.name});
    // if cartegory name exist then return 
    if(categoryName) return res.status(400).send("Category name already exists");

    const owner = req.user.user_id
    const category = new Cartegory({
        name: req.body.name,
        createdby: owner
    })

    const savedCategory = await category.save();
    try{
        res.json(savedCategory);
    }catch(err){
        res.json({msg: err})
    }  
};


module.exports = { getAllCategory, getcategory, deleteCategory, addCategory, updateCategory }