const router = require('express').Router();
const { authVerify, authRole } = require('../middlewares/authVerify');
const { getAllCategory, getcategory, addCategory, updateCategory, deleteCategory } = require('../controllers/cartegory')



//getting all cartegory
router.get('/', authVerify, authRole, getAllCategory )

//getting a specific category
router.get('/:cartegoryId', authVerify, authRole, getcategory )

//deleting category
router.delete('/:cartegoryId', authVerify, authRole, deleteCategory )

//updating cartegory
router.patch('/:cartegoryId', authVerify, authRole, updateCategory )

//post cartegory
router.post('/', authVerify, authVerify, addCategory )


module.exports = router;