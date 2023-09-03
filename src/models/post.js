// post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  metatitle: {
    type: String,
    required: true,
  },
  metadescription: {
    type: String,
    required: true,
  }, 
  keywords: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  file: {
    type: String, // Store the file path for uploaded images.
    default: '', // Default value is an empty string.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author:{
    type:String, 
    required: true,
  },
  cover:{
    type: String,
    
  },
  customUrl :{
    type: String,
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
