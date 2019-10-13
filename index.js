const express = require('express');
const mongoose = require('mongoose');
const expressLayouts =require('express-ejs-layouts');
const PORT =process.env.PORT || 5000;
const app = express();

//DB config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db,{useNewUrlParser: true})
.then(()=> console.log("MongoDB Connected..."))
.catch(err=> console.log(err));

//setting up middleware ejs as my view
app.set('view engine','ejs');

//BodyParser
app.use(express.urlencoded({extended:false}));

//setting views directory
app.set('views', __dirname + '/views');
// app.set('views', __dirname + '/patials');
app.use(express.static(__dirname + '/views'));
// app.use(express.static(__dirname + '/patials'));
//Routes
app.use("/",require("./Routes/app"));
app.use("/student",require("./Routes/user"));



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});