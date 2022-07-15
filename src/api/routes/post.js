const router = require("express").Router();
const { authVerify, authRole } = require("../middlewares/authVerify")
const { getAllproducts, getproduct, addProduct, editproduct, deleteProduct } = require('../controllers/post')



//get all products
router.get("/", authVerify, getAllproducts)

//getting single product
router.get("/:productId", authVerify, getproduct)

//update product
router.patch("/:productId", authVerify, authRole, editproduct)

//create product
router.post('/', authVerify, authRole, addProduct)

//deleting a product
router.delete("/:productId", authVerify, authRole, deleteProduct)


module.exports = router;