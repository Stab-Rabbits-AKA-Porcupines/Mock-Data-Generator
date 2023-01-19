const { FirstName, LastName, Country } = require('../models');
const dbController = [];

const makeArray = (req, res, next) => {
  res.locals.data = [];
  return next();
};
  
const getFirstNames = (req, res, next) => {
  const { firstName, fullName, fullNameMiddle, quantity } = req.query;
  if (!firstName && !fullName && !fullNameMiddle) return next();
  FirstName.aggregate([
    { $sample: { size: +quantity } },
    { $project: { 'firstName': 1, _id: 0 } },
  ])
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        res.locals.data.push({ firstName: data[i].firstName });
      }
      return next();
    })
    .catch((err) => {
      const newErr = {
        log: 'Error in getFirstNames',
        message: { err: 'Error: problem getting first names'}
     }
     return next(newErr)
    })
};

const getMiddleNames = (req, res, next) => {
  const {fullNameMiddle, quantity } = req.query;
  if (!fullNameMiddle) return next();
  FirstName.aggregate([
    { $sample: { size: +quantity } },
    { $project: { 'firstName': 1, _id: 0 } },
  ]).then((data) =>{
    for (let i =0; i < data.length; i++) {
      res.locals.data[i].middleName = data[i].firstName;
    }
    return next();
  })
    .catch((err) => {
      const newErr = {
          log: 'error in getMiddleNames',
          message: { err: 'problem getting Middle Names at this time'}
      }
      return next(newErr);
  })
};

const getLastNames = (req, res, next) => {
  const { lastName, fullName, fullNameMiddle, quantity } = req.query;
  if (!lastName && !fullName && !fullNameMiddle) return next();
  LastName.aggregate([
    { $sample: { size: +quantity } },
    { $project: { 'lastName': 1, _id: 0 } },
  ])
  .then((data)=> {
      for (let i = 0; i < data.length; i ++) {
        res.locals.data[i].lastName = data[i].lastName;
      } 
    return next();
  })
  .catch((err) => {
    const newErr = {
        log: 'error in getLastNames',
        message: { err: 'problem getting lastNames at this time'}
    }
    return next(newErr);
  })
};

const getEmails = (req, res, next) => {
  try{
    const { email, quantity } = req.query;
    if (!email) return next();
    for (let i = 0; i < quantity; i++) {
      let emailString = '';
      const emailLength = Math.floor(Math.random() * 31 + 5);
      
      for (let i = 0; i < emailLength; i++) {
        emailString += String.fromCharCode(Math.floor(Math.random() * 123 + 48));
      }
      
      emailString = emailString.replace(/[^0-9A-Za-z]/g, '');
      emailString += '@yeticrabs.com';
      
      res.locals.data[i] ? res.locals.data[i].email = emailString : res.locals.data.push({ email: emailString });
    }
    return next();
  }
  catch {((err) => {
    const newErr = {
        log: 'error in getEmails',
        message: { err: 'problem getting emails at this time'}
    }
    return next(newErr);
  })
  }
};

const getPhoneNumbers = (req, res, next) => {
  try {
    const { phoneNumber, quantity } = req.query;
    if (!phoneNumber) return next();

    for (let i = 0; i < quantity; i++) {
      let phoneNumString = '';
      for (let i = 0; i < 10; i++) {
        if (i===0) phoneNumString += '(';
        phoneNumString += Math.floor(Math.random() * 10);
        if (i===2) phoneNumString += ') ';
        if (i===5) phoneNumString += '-';
      }
      res.locals.data[i] ? res.locals.data[i].phoneNumber = phoneNumString : res.locals.data.push({ phoneNumber: phoneNumString });
    }
    return next();
  }
  catch {((err) => {
    const newErr = {
        log: 'error in getPhoneNumbers',
        message: { err: 'problem getting phone numbers at this time'}
    }
    return next(newErr);
  })
  }
  };

const getCountry = (req, res, next) => {
  const { country, quantity } = req.query;
  if (!country) return next();
  Country.aggregate([
    { $sample: { size: +quantity } },
    { $project: { 'country': 1, _id: 0 } },
  ])
  .then((data)=> {
      for (let i = 0; i < data.length; i++) {
        res.locals.data[i] ? res.locals.data[i].country = data[i].country : res.locals.data.push({ country: data[i].country });
      }
    return next();
  })
    .catch((err) => {
      const newErr = {
          log: 'error in getMiddleNames',
          message: { err: 'problem getting Middle Names at this time'}
      }
      return next(newErr);
  })
}

const getCoordinates = (req, res, next) => {
  try {
    const { coordinates, quantity } = req.query;
    if (!coordinates) return next();
    
    for (let i = 0; i < quantity; i++) {
        const coordinatesString = (Math.random() * (180) + -90).toFixed(5) + ', ' + (Math.random() * (360) + -180).toFixed(5);        
        res.locals.data[i] ? res.locals.data[i].coordinates = coordinatesString : res.locals.data.push({ coordinates: coordinatesString});
    }
      return next();
    }
  catch {((err) => {
    const newErr = {
        log: 'error in getCoordinates',
        message: { err: 'problem getting coordinates at this time'}
    }
    return next(newErr);
  })
  }
};

dbController.push(makeArray);
dbController.push(getFirstNames);
dbController.push(getMiddleNames);
dbController.push(getLastNames);
dbController.push(getEmails);
dbController.push(getPhoneNumbers);
dbController.push(getCountry);
dbController.push(getCoordinates);
module.exports = dbController;