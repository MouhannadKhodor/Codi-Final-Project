
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
    methods:["GET","POST","DELETE","PATCH"],
    credentials:true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods','PATCH, POST, GET, DELETE',);
       next();
 });



//Import Routes
const postsRoutes = require('./routes/posts')
const authRoute = require('./routes/auth')
const categoriesRoutes = require('./routes/categories')
const messagesRoutes = require('./routes/messages')
//Routes
app.get('/',(req,res)=>{
    res.send('we are on home')
})

app.use('/posts',postsRoutes)

app.use('/api/user',authRoute)

app.use('/category',categoriesRoutes)

app.use('/messages',messagesRoutes)
//DB Connection
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},()=>{
    console.log('connected to DB!')
})


//Listening to port 8000
app.listen(8000);