const router = require('express').Router();
const { access_token } = require('../middlewares/authVerify');


router.get("/", access_token, (req, res)=>{
    res.status(200).json(
        {
            access_token: req.access_token
        }
    )
})



module.exports = router
