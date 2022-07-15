const router = require("express").Router();
const { authVerify, authRole} = require("../middlewares/authVerify");
const { getAllUsers, getUser, updateUser, addUser, deleteUser } = require('../controllers/user')



// get all users
router.get('/', authRole, getAllUsers)

//getting specific user
router.get("/:userId", authVerify, getUser)

//update user
router.patch('/:userId', authVerify, updateUser)

//delete user
router.delete('/:userId', authRole, deleteUser)

//post user
router.post('/', authRole, addUser)

module.exports = router