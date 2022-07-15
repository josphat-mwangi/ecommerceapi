const User = require("../models/User");
const { registrationValidation } = require('../validations/authvalidation')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


// get all users

const getAllUsers =  async(req, res)=>{
   
    const allUsers = await User.find({});
    if(allUsers){
        res.status(200).json({
            success: true,
            data: allUsers,
            msg: "All users"
        })
    }else{
        res.status(401).json({
            success: false,
            data: null,
            message: "No users found"
        })
    }
   
}



//getting specific user
const getUser = async(req, res) =>{
    try{
        const user = await User.findById({_id:req.user.user_id});
        res.status(200).json({
            success: true,
            data: user,
        })
    }catch(err){
        res.status(400).json({
            success: false,
            data: null,
            msg: err
        })
    }
};


//update user
const updateUser = async(req, res) =>{
    try{
        const id =  req.user.user_id
        const updates = req.body;
        const options = {new: true}

        const user = await User.findByIdAndUpdate(id, updates, options);
        if(!user){
            res.status(400).json({
                msg: "user does not exist"
            })
        }
        res.status(200).json(product)
    }catch(err){
        if (err instanceof mongoose.CastError){
            res.status(400).json({
                msg: 'Invalid user Id'
            })
            
        }
        res.status(400).json({
            msg: err
        })
    }
};

//delete user
const deleteUser = async(req, res)=>{
    const id = req.params.userId
    try{
        const user = await User.findByIdAndDelete(id);
        if(!user){
            res.status(400).json({
                msg: "user does not exist"
            })
        }
        res.status(200).json(user)
    }catch(err){
        if (err instanceof mongoose.CastError){
            res.status(400).json({
                msg: 'Invalid user Id'
            })
        }
        res.status(400).json({
            msg: err
        })
    }
};

//post user
const addUser =  async(req, res)=>{
    const { error } = registrationValidation(req.body)
    if(error){
        res.status(400).json(error.details[0].message)
    }

    //checking if email exists
    const emailExist = await User.findOne({email:req.body.email});
    // if email exist then return 
    if(emailExist) return res.status(400).send("Email already exist");

    //hash password
    const salt = await bcrypt.genSalt(10);
    
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const hashCPassword = await bcrypt.hash(req.body.repeat_password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        repeat_password: hashCPassword
    });

     
    try{
        const saveUser = await user.save();
        // create token
        const token = jwt.sign({user_id: user._id}, process.env.TOKEN_SECRET,{
            expiresIn: "5h"
        });

        res.status(200).send(token)
    }catch(err){
        res.status(500).send(err);
    }


};

module.exports = { getAllUsers, getUser, updateUser, deleteUser, addUser }