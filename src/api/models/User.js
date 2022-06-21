const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username taken"],
        require: [true, "Please enter username"],
        min: 6,
        max: 255,
    },

    email: {
        type: String,
        require: [true,"email field is required"],
        unique: true,
        lowercase: true,

    },

    password: {
        type: String,
        require: true,
        min: 8,
        max: 1024,
    },

    confrimPassword:{
        type: String,
        require: [true, "Please confirm your Password"],
        validate: {
            validator: (el)=>{
                return el === this.password;
            },
            message: "Password do not match"
        }
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true}
);

module.exports = mongoose.model('User', userSchema)