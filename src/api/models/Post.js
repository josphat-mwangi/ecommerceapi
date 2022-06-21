const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    productName:{
        type: String,
        require: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorySchema",
        require: true
    },
    noOfItems:{
        type: Number,
        require: true,
    },
    quantity:{
        type: String,
    },
    imageUrl:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    unitPrice:{
        type: Number,
        require: true
    },
    unitPriceCurrency:{
        type: String,
        require: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema",
        require: true
    },
   
},
{ timestamps: true}
);


module.exports = mongoose.model('Post', PostSchema)