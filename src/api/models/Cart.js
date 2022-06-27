const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId

const CartSchema = mongoose.Schema({
    userId:{
        type: objectID,
        ref: 'User',
        require: true
    },
    products:[
        {
            productId: {
                type: objectID,
                ref: 'Post',
                required: true
            },
            productName: {
                type: String,
                required: true,
            },
            quantity:{
                type: String,
                required: true,
            },
            noOfItems:{
                type: Number,
                min: 1,
                default: 1,
                required: true,
            },
            unitPrice:{
                type: Number,
                required: true
            },
            unitPriceCurrency:{
                type: String,
                required: true
            },
            
        },
        
    ],
    totalBill: {
        type: Number,
        required: true,
        default: 0
    }
},
    { timestamps: true}
);

module.exports = mongoose.model("Cart", CartSchema);