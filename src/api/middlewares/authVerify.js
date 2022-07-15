const jwt = require('jsonwebtoken');
require('dotenv').config()
const authBase64 = require("./authBase64");
const request = require("request");

function authVerify (req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        return next();

    }catch(err){
        res.send('invalid token')
    }

    return next();
}

function authRole(req, res, next){
    
    if(req.user.isAdmin !== true ){
        res.status(401);
        return res.send('not allowed')
    }

    next()
    
}

const access_token = (req, res, next) => {
  let endpoint_url = process.env.authurl;
  let auth = authBase64(process.env.Consumer_Key, process.env.Consumer_Secret);

  request(
    {
      url: endpoint_url,
      headers: {
        Authorization: "Basic " + auth,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        req.access_token = JSON.parse(body).access_token;
        next();
      }
    }
  );
};



module.exports = { authVerify, authRole, access_token }