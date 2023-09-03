const mongoose = require('mongoose');
const citySchema = new mongoose.Schema({
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
    footTitle:{
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
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
  const CityData = mongoose.model('CityData', citySchema);