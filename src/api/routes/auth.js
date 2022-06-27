const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middlewares/authVerify")

// validation of user inputs
const { registrationValidation, loginValidation } = require('../validations/authvalidation');


router.post('/register', async(req, res)=>{
    //validating user inputs
    const {error} = registrationValidation(req.body);

    // if error exists then send back error
    if(error){
        return res.status(400).send(error.details[0].message);
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

});

router.post("/login", async(req, res)=>{
    // validating user input
    const { error } = loginValidation(req.body);

    // throw error if any
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    //checking if email exists
    const user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send("Incorrect Email");
 
    // verifying password
    const validPassword = await bcrypt.compare(req.body.password, user.password || usernameExist.password);
    if(!validPassword) return res.status(400).send("Incorrect Password");

    // create token
    const token = jwt.sign({user_id: user._id}, process.env.TOKEN_SECRET,{
        expiresIn: "5h"
    });
    res.header('auth-token', token).send(token);

});

router.put("/logout", verifyToken, async(req, res)=>{
    const authHeader = req.headers["authorization"];

    jwt.sign(authHeader, "", { expiresIn: 1}, (logout, err)=>{
        if(logout){
            res.send({msg : "Successfully logged out"})
        }else{
            res.send({msg: "Error"})
        }
    })
})



module.exports = router;