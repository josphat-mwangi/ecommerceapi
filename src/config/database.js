const mongoose = require("mongoose");
const doenv = require('dotenv');

exports.connect = () => {
    // connect to DB
    mongoose
    .connect(process.env.DBURI, { useNewUrlParser: true})
    .then(()=> console.log("DB Connection Sucessfull"))
    .catch((err)=>{
        console.log(err);
    });
}
