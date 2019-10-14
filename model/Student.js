const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    id:{
        type:String,
        required: true,
        unique:true,
    },
    lname:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
        default:Date.now()
    },
    email:{
        type:String,
        required:true,
    },
    
    password:{
        type:String,
        required:true,
    },
})

const Student = mongoose.model('Student',StudentSchema);

module.exports = Student;