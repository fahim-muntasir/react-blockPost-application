const mongoose = require('mongoose');

const postSchemas = mongoose.Schema({
    author: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true 
    },
    discription: {
        type: String,
        require: true
    },
    postAvatar:String,
    category: {
        type: String,
        require: true
    },
    postLike:{
        type: String,
        default: 0
    },
    postDate: {
        type: Date,
        default: Date.now()
    }
})

const Post = mongoose.model('Post', postSchemas);

module.exports = Post;