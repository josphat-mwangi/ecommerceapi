const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
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
    ]
},
    { timestamps: true}
);

module.exports = mongoose.model("Cart", CartSchema);