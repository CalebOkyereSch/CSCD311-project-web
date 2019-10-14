const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load User Model

const student = require('../model/Student');

module.exports = (passport)=>{
    passport.use(
        new LocalStrategy({usernameField: 'id' },(id,password,done)=>{
            //Match User
            student.findOne({id:id})
            .then( student => {
                if(!student){
                return done(null, false, {message: "This ID is not registered"});

            }
            //Match password
            bcrypt.compare(password,student.password,(err,isMatch)=>{
                if(err) throw err;

                if(isMatch){
                    return done(null,student);
                }
                else{
                    return done(null,false,{message:"Password Incorrect"});
                }
            });
        })
            .catch(err=> console.log(err));
        })
        );

        passport.serializeUser((student, done)=> {
            done(null, student.id);
          });
          
          passport.deserializeUser((id, done)=>{
            student.findById(student.id, (err, student)=>{
              done(err, student);
            });
          });
}



