const mongoose = require('mongoose');

//we want to make a collection of first names and last names 
let firstNameNumber = 0
const firstNameSchema  = new mongoose.Schema ({
  firstName : {type: String, required: true}, 
  nameNum: {type: Number, default: firstNameNumber++}
});

let lastNameNumber = 0
const lastNameSchema = new mongoose.Schema ({
    lastName: {type: String, required: true},
    nameNum: {type: Number, default: lastNameNumber++}
});

const countrySchema = new mongoose.Schema(
  {
    country: {type: String, required: true}
  },
  {
      collection: "country"
  }
);


const FirstName = mongoose.model('firstName', firstNameSchema);
const LastName = mongoose.model('lastName', lastNameSchema);
const Country = mongoose.model('country', countrySchema);


module.exports = {
    FirstName,
    LastName,
    Country,
  };


  
  