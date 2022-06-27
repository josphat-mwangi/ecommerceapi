const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username taken"],
        required: [true, "Please enter username"],
        min: 6,
        max: 255,
    },

    email: {
        type: String,
        required: [true,"email field is required"],
        unique: true,
        lowercase: true,

    },

    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024,
    },

    repeat_password:{
        type: String,
        required: true,
        min: 8,
        max: 1024,
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true}
);

module.exports = mongoose.model('User', userSchema)