const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId

const PostSchema = mongoose.Schema({
    productName:{
        type: String,
        required: true,
    },
    category:{
        type: objectID,
        ref: "Cartegory",
        required: true
    },
    noOfItems:{
        type: Number,
        required: true,
    },
    quantity:{
        type: String,
        required: true,
    },
    // imageUrl:{
    //     type: String,
    //     required: true
    // },
    unitPrice:{
        type: Number,
        required: true
    },
    unitPriceCurrency:{
        type: String,
        required: true
    },
    author:{
        type: objectID,
        ref: "User",
        required: true
    },
   
},
{ timestamps: true}
);


module.exports = mongoose.model('Products', PostSchema)