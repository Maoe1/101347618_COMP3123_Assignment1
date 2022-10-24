const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name:
    {
        type: String,
        required: true,
        unique: true,
    },
    email:  
    {
        type: String,
        unique: true,
        maxLength: 100,
        lowercase: true
    },
    password: { 
        type: String,
        required: true
     },
   
});

const users = mongoose.model("Users", userSchema);
module.exports = users;

