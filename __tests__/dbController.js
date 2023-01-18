const dbController = require('../server/controllers/dbController.js');

// index:
// 0 => makeArray
// 1 => getFirstNames
// 2 => getMiddleNames
// 3 => getLastNames
// 4 => getEmails
// 5 => getPhoneNumbers
// 6 => getCountry
// 7 => getBirthday

//functions

describe('dbController tests', () => {
  const req = {};
  const res = {};

  beforeAll(() => {
    //mockreq
    req.query = {
        quantity: 3,
        birthday: true
      }

    //mockres
    res.locals = {
        data: []
      }
  });

  //if data empty, need to make obj + add properties
  //if data has at least 1 obj in it, just add properties
  describe('getBirthday controller tests', () => {
    const getBirthday = dbController[7];

    it('has a function getBirthday', () => {
      expect(typeof getBirthday).toBe('function');
      
    });
  
    it('res.locals has birthday property in each obj', () => {
      getBirthday(req,res);
      
      for(let i = 0; i < req.query.quantity; i++){
        expect(res.locals.data[i]).toHaveProperty('birthday');
        expect(res.locals.data[i].birthday).toBeDefined();
      }
  
    });

    it('all birthdays in res.locals should be a string', () => {
      getBirthday(req,res);
      for(let i = 0; i < req.query.quantity; i++){
        expect(typeof res.locals.data[i].birthday).toBe('string');
      }
    })
  
    it('birthday should have a year, month and day split up by /', () => {
      getBirthday(req,res);
    
      for(let i = 0; i < req.query.quantity; i++){
        expect(res.locals.data[i].birthday[4]).toEqual('/');
        expect(res.locals.data[i].birthday[7]).toEqual('/'); 
      }
    })
  
    it('day in birthday should be a number between 01 and 31 and should always be 2 characters long', () => {
      for(let i = 0; i < req.query.quantity; i++){
        const splitBirthday = res.locals.data[i].birthday.split('/');
        expect(splitBirthday[2]).toHaveLength(2);
        expect(typeof Number(splitBirthday[2])).not.toBeNaN();
        expect(Number(splitBirthday[2])).toBeLessThanOrEqual(31);
        expect(Number(splitBirthday[2])).toBeGreaterThanOrEqual(1);
      }
      
  
    })
  
    it('month in birthday should be a number between 01 and 12 and should always be 2 characters long', () => {
      for(let i = 0; i < req.query.quantity; i++){
        const splitBirthday = res.locals.data[i].birthday.split('/');
        expect(splitBirthday[1]).toHaveLength(2);
        expect(typeof Number(splitBirthday[1])).not.toBeNaN();
        expect(Number(splitBirthday[1])).toBeLessThanOrEqual(12);
        expect(Number(splitBirthday[1])).toBeGreaterThanOrEqual(1);
      }
  
    })
  
    it('year in birthday should be a number between 1900 and 2023 and should always be 4 characters long', () => {
      for(let i = 0; i < req.query.quantity; i++){
        const splitBirthday = res.locals.data[i].birthday.split('/');
        expect(splitBirthday[0]).toHaveLength(4);
        expect(splitBirthday[0]).toHaveLength(4);
        expect(typeof Number(splitBirthday[0])).not.toBeNaN();
        expect(Number(splitBirthday[0])).toBeLessThanOrEqual(2023);
        expect(Number(splitBirthday[0])).toBeGreaterThanOrEqual(1900);
      }
    })
  });
  });

  
