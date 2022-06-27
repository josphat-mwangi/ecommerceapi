const express = require('express');
const app = express();
const cors = require('cors')
const doenv = require('dotenv');
const bodyparser = require('body-parser');
const db = require('./config/database')
// import Routes
const authRoute = require('./api/routes/auth');
const productRoute = require('./api/routes/post');
const cartegoryRoute = require('./api/routes/cartegory');
const usersRoute = require('./api/routes/user')


doenv.config();


db.connect()
app.use(cors());
app.use(bodyparser.json())



//route middleware
app.use('/api/user', authRoute);
app.use('/api/product', productRoute);
app.use('/api/cartegory', cartegoryRoute);
app.use('/api/users', usersRoute);

app.listen(process.env.PORT || 5000, ()=> console.log('Server Running'))