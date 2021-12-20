const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

//internal import
const postrouter = require('./server/routers/post');
const userrouter = require('./server/routers/user');
const dbConnect = require('./server/database/dbConnect');

const app = express();
dotenv.config();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRETE));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({urlencoded:true}));


//database connection
dbConnect();

//router setup
app.use('/post', postrouter);
app.use('/user', userrouter);

app.listen(process.env.PORT || 5000, () => console.log(`server is runing on http://localhost:${process.env.PORT || 5000}`));