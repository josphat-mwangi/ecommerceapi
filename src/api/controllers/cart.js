const Cart = require("../models/Cart");
const Product = require("../models/Post");


//get cart
const getcart = async(req, res)=>{
    const userId = req.user.user_id

    try{
        const cart = await Cart.findOne({ userId });

        if(cart && cart.products.length>0){
            res.status(200).send(cart);
        }else{
            res.send(null);
        }
    }catch(error){
        res.status(500).send();
    }
};


//create cart
const createCart = async(req, res)=>{
    const userId = req.user.user_id

    const { productId, quantity, noOfItem, unitPrice } = req.body;

    try{
        const cart = await Cart.findOne({ userId });
        const item = await Product.findOne({ _id: productId});
        if(!item){
            res.status(404).send({message: "item not found"})
        }

        

        if(cart){
            const itemIndex = cart.products.findIndex((item) => item.productId == productId)

            //check if product exists or not

            if(itemIndex > -1){
                let product = cart.products[itemIndex];
                product.noOfItem += noOfItem;
                cart.totalBill = cart.products.reduce((acc, curr)=>{
                    return acc + curr.noOfItem * curr.unitPrice;
                }, 0)
                cart.products[itemIndex] = product;
                await cart.save()
                res.status(200).send(cart);

            }else{
                cart.products.push({ productId, productName, quantity, noOfItem, unitPrice });

                cart.totalBill = cart.products.reduce((acc, curr) => {
                return acc + curr.noOfItem * curr.price;},0)

                await cart.save();
                res.status(200).send(cart)
            }
        }else{
            // no cart exists, create one

            const newCart = await Cart.create({
                userId,
                products: [{ productId, productName, quantity, noOfItem, unitPrice}],
                totalBill: noOfItem * unitPrice,
            });
            return res.status(201).send(newCart);
        }
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong")
    }
};


const deleteCart = async(req, res)=>{
    const userId = req.user.user_id
    const productId = req.query.productId

    try{
        let cart = await Cart.findOne({ userId });
        const itemIndex = cart.products.findIndex((item)=> item.productId == productId);

        if(itemIndex > -1){
            let item = cart.products[itemIndex];
            cart.totalBill -= item.noOfItem * item.unitPrice;
            if(cart.totalBill < 0){
                cart.totalBill = 0
            }

            cart.products.splice(itemIndex, 1);
            cart.totalBill = cart.products.reduce((acc, curr) =>{
                return acc + curr.noOfItem * unitPrice;
            }, 0)
            
            cart = await cart.save();
            res.status(200).send(cart);
        }else{
            res.status(404).send("item not found")
        }
    }catch(err){
        console.log(err);
        res.status(400).send("something is wrong");
    }
};



module.exports = { getcart, deleteCart, createCart}



