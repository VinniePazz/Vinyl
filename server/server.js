const express = require('express');
const cookieParser = require('cookie-parser'); 

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

// Models
const { User } = require('./models/user');

// Middlewares
const { auth } = require('./middleware/auth');


//=================================
//              USERS
//=================================



const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Server Running at ${port}`)
})