const router = require('express').Router();
const { authVerify } = require('../middlewares/authVerify');
const { getcart, createCart, deleteCart} = require('../controllers/cart')


//get cart
router.get("/", authVerify, getcart);


//create cart
router.post("/",authVerify, createCart );


router.delete("/cart/", deleteCart );


module.exports = router
