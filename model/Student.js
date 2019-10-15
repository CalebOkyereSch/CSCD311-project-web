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

    gender:{
        type:String,
        enum:['M','F'],
        required:true
    },

    email:{
        type:String,
        required:true,
    },
    
    password:{
        type:String,
        required:true,
    },

    roomId:{
        type: mongoose.Schema.ObjectId,
        ref : 'Room'
    }
});


StudentSchema.virtual('room',{
    ref:'Room',
    localField:'roomId',
    foreignField:'_id',
    justOne:true
})


const Student = mongoose.model('Student',StudentSchema);

module.exports = Student;