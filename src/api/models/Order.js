const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    products:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PostSchema'
            }
        }
        
    ],
    amount:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    address:{
        type: Object,
        require: true
    }
    
},
{ timestamps: true }
)