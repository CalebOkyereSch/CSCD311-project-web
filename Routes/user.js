const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const id = Math.floor(10600000 + ((10000 * Math.random()) + 1));
let satisfy ;
let auth = false;
let identity ;

 


//use model
const student = require('../model/Student.js');


//login page
router.get("/login",(req,res)=>{
    res.render('login');
});


//register page
router.get("/register",(req,res)=>{
    res.render('register');
});

//handling register
router.post('/register',(req,res)=>{
  const {fname,lname,dob,gender,email,password,password2,hall,room} =req.body; 
    let errors = [];
    
    //checking for fields
    if(!fname || !lname || !dob || !gender || !email || !password || !password2){
        errors.push({msg:'Please fill in all fields'});
    }

    //checking password match
    if(password !== password2){
        errors.push({msg:'Passwords do not match'});
    }

    //checking password length
    if(password.length > 5 || password.length <5){
        errors.push({msg:'Password should be at 5 character'})
    }

    if(errors.length > 0){
        res.render('register',{
            errors,
            fname, 
            lname,
            dob,
            gender,
            email,
            password,
            password2
        });
    }
    else{
        
         student.findOne({email:req.body.email})
     .then( (Student) => {
            if(Student){
                errors.push({msg:"Email is already registered"});
                //user exist
                res.render('register',{
                    errors,
                    fname, 
                    lname,
                    dob,
                    gender,
                    email,
                    password,
                    password2
                });

            }
               
            else{
                do{
                
                student.findOne({id:id})
                .then( Student => {
                    if(id){
                        satisfy =true;
                    }
                    else{
                        satisfy =false;
                    }
                });
                }
                while(satisfy);
                const newStudent = new student({
                    id,
                    lname,
                    fname,
                    dob,
                    gender,
                    email,
                    password,
                    hall,
                    room
                });
               //hash password
               bcrypt.genSalt(10,(err,salt)=>
                    bcrypt.hash(newStudent.password,salt, (err,hash)=>{
                        if(err) throw err;
                        //setting password to hashed
                        newStudent.password = hash;
                        //saving user
                        newStudent.save()
                        .then(student =>{
                            req.flash('success_msg',`You are registered and can now login with ${id}`);
                            res.redirect('/student/login');
                        })
                        .catch(err => console.log(err));
                    })
               ) 

            }
        });
    }
});

// dashbord for  all student and halls
router.get("/dashboard",isLoggedIn,(req,res)=>{
    student.find({}).exec((err,student)=>{
        if(err) throw err;
         res.render('layout',{stud:student});

    })
   
});

//handling post request
router.post("/login",(req,res,next)=>{
    passport.authenticate('local',{
    successRedirect:"/student/dashboard",
    failureRedirect:"/student/login",
    failureFlash:true,
    })(req,res,next);
    // to set auth to true;
    auth=true;
    identity = req.body.id;   
   
});


// function to check if user is logged in
function isLoggedIn(req, res, next) {
    if (auth){
        auth = false;
      return next();
    }
    else{
    res.redirect('/student/login');
    }
  }

module.exports = router;