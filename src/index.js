const express = require('express')
app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()

mongoose
    .connect(process.env.DBURI, { useNewUrlParser: true})
    .then(()=> console.log("DB Connection Sucessfull"))
    .catch((err)=>{
        console.log(err);
    });

app.use(cors());
app.use(express.json());


app.listen(process.env.PORT || 5000, ()=> console.log('Server Running'))