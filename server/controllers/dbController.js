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
      const tempArr = [...res.locals.data];
      for (let i = 0; i < data.length; i++) {
        newObj = {
          firstName: data[i].firstName
        };
        tempArr.push(newObj);
      }
      res.locals.data = tempArr;
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
    const tempArr = [...res.locals.data];
    for (let i =0; i < data.length; i++) {
      tempArr[i].middleName = data[i].firstName;
    }
    res.locals.data = tempArr;
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
    const tempArr = [...res.locals.data];
    if (tempArr[0]) {
      for (let i = 0; i < quantity; i ++) {
        tempArr[i].lastName = data[i].lastName;
      }
    }else{
      for (let i = 0; i < quantity; i++) {
        newObj = {
          lastName: data[i].lastName,
        }
        tempArr.push(newObj);
      }
    }
    res.locals.data = tempArr;
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
    const tempArr = [...res.locals.data];
    for (let i = 0; i < quantity; i++) {
      let emailString = '';
      const emailLength = Math.floor(Math.random() * 31 + 5);
      
      for (let i = 0; i < emailLength; i++) {
        emailString += String.fromCharCode(Math.floor(Math.random() * 123 + 48));
      }
      
      emailString = emailString.replace(/[^0-9A-Za-z]/g, '');
      emailString += '@yeticrabs.com';
      
      if (tempArr[i]) {
        tempArr[i].email = emailString;
      } else {
        const newObj = {
          email: emailString
        }
        tempArr.push(newObj);
      }
    }
    res.locals.data = tempArr;
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
    const tempArr = [...res.locals.data];
    
    for (let i = 0; i < quantity; i++) {
      let phoneNumString = '';
      for (let i = 0; i < 10; i++) {
        if (i===0) phoneNumString += '(';
        phoneNumString += Math.floor(Math.random() * 10);
        if (i===2) phoneNumString += ') ';
        if (i===5) phoneNumString += '-';
      }
      if (tempArr[i]) {
        tempArr[i].phoneNumber = phoneNumString
      } else {
        const newObj = {
          phoneNumber: phoneNumString
        }
        tempArr.push(newObj);
      }
    }
    res.locals.data = tempArr;
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
    const tempArr = [...res.locals.data];
    if (tempArr[0]) {
      for (let i = 0; i < data.length; i++) {
        tempArr[i].country = data[i].country;
      }
    }else{
      for (let i = 0; i < data.length; i++) {
        const newObj = {
          country: data[i].country
        }
        tempArr.push(newObj);
      }
    }
    res.locals.data = tempArr;
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

const getLink = (req, res, next) => {
  try {
    const { link, quantity } = req.query;
    if (!link) return next(); 
    const tempArr = [...res.locals.data];
    const suffix = ['.com', '.io', '.org', '.edu', '.net', '.us']
    for (let i = 0; i < quantity; i++) {
      let prefix = 'https://'
      let url = '';
      const urlLength = Math.floor(Math.random() * (10) + 30)
        for (let i = 0; i < urlLength; i++) {
          url += String.fromCharCode(Math.floor(Math.random() * 123 + 48));
        }
        url = url.replace(/[^0-9A-Za-z]/g, '');
        // url = url.replace(/(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9][a-z0-9-][a-z0-9]/g);
        prefix += url + suffix[Math.floor(Math.random() * (6))];

        if (tempArr[i]) {
          tempArr[i].link = prefix;
        } else {
          const newObj = {
            link: prefix
          }
          tempArr.push(newObj);
        }
      }
      res.locals.data = tempArr;
      return next();
    }
  catch {((err) => {
    const newErr = {
        log: 'error in getLink',
        message: { err: 'problem getting links at this time'}
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
dbController.push(getLink);
module.exports = dbController;


