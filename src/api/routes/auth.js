const router = require("express").Router();
const {authVerify} = require("../middlewares/authVerify");
const { register, login, logout } = require('../controllers/auth')




router.post('/register', register)

router.post("/login", login)

router.put("/logout", authVerify, logout)



module.exports = router;