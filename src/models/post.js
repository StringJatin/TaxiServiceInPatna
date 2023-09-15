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
  author:{
    type:String, 
    required: true,
  },
  customUrl :{
    type: String,
  },
  mediaUrl:{
    type:String,
    required:true
},
createdAt:{
  type:String,
  
}

},
);


export default mongoose.models.PostPage ||  mongoose.model('PostPage', postSchema);
