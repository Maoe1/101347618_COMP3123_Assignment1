const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    first_name:
     {
        type: String,
        require: true,
        lowercase: true
     },
    last_name: {
        type: String,
        require: true,
        lowercase: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,    
    },
    gender: {
        type: String,
        enum: ['male','female', 'other'],
        lowercase: true
    },
    salary:
    {
        type: Number,
        require: true

    }
   
});

const employee = mongoose.model("Employee", empSchema);
module.exports = employee;

