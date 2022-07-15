const Order = require('../models/Order');



const getOrder = async(req, res)=>{
    
    const userId =  req.user.user_id


    try{
        const order = await Order.find({ userId: userId }).sort();
        if(order){
            res.status(200).json(order)
        }
        res.status(400).json({
            success: false,
            data: null,
            message: "No order found"
        })
      
    }catch(error){
        res.status(400).json(
            error
        )
    }
};

module.exports = { getOrder }