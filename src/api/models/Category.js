const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
    Createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Category', categorySchema)