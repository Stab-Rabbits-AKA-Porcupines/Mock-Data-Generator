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
// 8 => getLink
// 9 => getCoordinates

//functions

describe('dbController tests', () => {
  const req = {}
  const res = {}

  beforeAll(() => {
    //mockreq
    req.query = {
        quantity: 3,
        link: true
      }

    //mockres
    res.locals = {
        data: []
      }
  });

  //if data empty, need to make obj + add properties
  //if data has at least 1 obj in it, just add properties

  it('has a function getBirthday', () => {
     
    // const getBirthday = dbController[0];
    // console.log(dbController[0].prototype);
    // expect(dbController.find()).toBe(makeArray);
    // expect(dbController.includes(makeArray)).toBe(true);
    expect(typeof dbController[0]).toBe('function');
  });

  describe('getLink controller tests', () => {
    const getLink = dbController[7];

    it('has a function getLink', () => {
      // test for function type
      expect(typeof getLink).toBe('function');
    });
      // test for return string
    it('getLink returns a string', () => {
      getLink(req, res);
      for (let i = 0; i <req.query.quantity; i++) {
        const result = res.locals.data[i].link;
        expect(typeof result).toBe('string')
      }
      
    });
      // test for first 7 indexes to = 'https://'
    it('getLink returned string has a valid https:// prefix', () => {
      getLink(req, res);
      for (let i = 0; i <req.query.quantity; i++) {
        const prefix = res.locals.data[i].link.slice(0, 8)
        expect(prefix).toBe('https://');
      }
    });
      // test for 8th index to be a valid character
    it('getLink has a letter for the 8th index of its returned string', () => {
      getLink(req, res);
      for (let i = 0; i <req.query.quantity; i++) {
        const eighthIndex = res.locals.data[i].link.slice(8, 9);
        function validChar(str) {
        return /^[A-Za-z0-9]*$/.test(str);
      }
      expect(validChar(eighthIndex)).toBe(true)
    }
    });
      // test for final 3 or 4 indexes to = one of suffix array elements
    it('getLink has a valid suffix', () => {
      const suffix = ['.com', '.io', '.org', '.edu', '.net', '.us']
      getLink(req, res);
        for (let i = 0; i <req.query.quantity; i++) {
          const string4 = res.locals.data[i].link.slice(-4);
          const string3 = res.locals.data[i].link.slice(-3);
          let result = false; 
          if(suffix.includes(string3) || suffix.includes(string4)) result = true;
          expect(result).toBe(true)
      };
    });
      // test for res.locals.data to be updated
    it('getLink populates res.locals.data', () => {
      getLink(req, res);
      for (let i = 0; i <req.query.quantity; i++) {
        const result = res.locals.data[i].link;
        expect(result).toBeTruthy()
      }
  });
   
});

});
