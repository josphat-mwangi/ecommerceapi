const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
    }
    
},
{ timestamps: true}
)


module.exports = mongoose.model('Category', categorySchema)