// post.js

const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
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
  FromRoute: {
    type: String

  },
  content: {
    type: String

  },
  toRoute:{
    type: String
   
  },
  customUrl :{
    type: String,
  },
  faq1: {
    que : String,
    ans : String,
  },
  faq2: {
    que : String,
    ans : String,
  },
  faq3: {
    que : String,
    ans : String,
  },
  faq4: {
    que : String,
    ans : String,
  },
  faq5: {
    que : String,
    ans : String,
  }
});

const RoutePage = mongoose.models.RoutePage ||  mongoose.model('RoutePage', routeSchema);

export default RoutePage;
