const router = require("express").Router();
const { authVerify } = require('../middlewares/authVerify');
const { getOrder } = require('../controllers/order');



router.get('/orders', authVerify, getOrder);



module.exports = router