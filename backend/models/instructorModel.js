const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please Enter Instructor name"],
    },
    experience:{
        type: String,
        required: [true,"Please Enter your Experience"],
    },
    expert:{
        type: String,
        required: [true,"Please Enter your Area of Expertise"]
    },
    profile:{
        type: String,
        required: [true,"Please Enter your LinkedIn Profile"]
    },
    status:{
        type: Boolean,
        required: [true,"Please Enter your Status"],
        default: true
    }
})

module.exports = mongoose.model("Instructor",instructorSchema);