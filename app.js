
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv/config')


//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


//Import Routes
const postsRoutes = require('./routes/posts')
const authRoute = require('./routes/auth')


//Routes
app.get('/',(req,res)=>{
    res.send('we are on home')
})

app.use('/posts',postsRoutes)

app.use('/api/user',authRoute)



//DB Connection
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},()=>{
    console.log('connected to DB!')
})

//Listening to port 3000
app.listen(3000);