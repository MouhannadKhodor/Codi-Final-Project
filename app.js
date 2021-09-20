
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv/config')



//Middlewares
app.use('/public', express.static(path.join(__dirname, 'public/uploads')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin:true,
    methods:["GET","POST"],
    credentials:true
}));



//Import Routes
const postsRoutes = require('./routes/posts')
const authRoute = require('./routes/auth')
const categoriesRoutes = require('./routes/categories')

//Routes
app.get('/',(req,res)=>{
    res.send('we are on home')
})

app.use('/posts',postsRoutes)

app.use('/api/user',authRoute)

app.use('/category',categoriesRoutes)

//DB Connection
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},()=>{
    console.log('connected to DB!')
})


//Listening to port 8000
app.listen(8000);