const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const expressLayouts =require('express-ejs-layouts');
const PORT =process.env.PORT || 5000;
const app = express();

//passport config
 require('./config/passport')(passport);

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

//Express session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
  }));

  //passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash 
app.use(flash());

// Global variabels
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

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