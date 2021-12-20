const mongoose = require('mongoose');

const userSchemas = mongoose.Schema({
    name:{
        type: String,
        require: true 
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    userAvatar: {
        type: String,
    },
    password: {
        type: String,
        require: true,
        trim: true
    }
})

const User = mongoose.model("User", userSchemas);

module.exports = User;