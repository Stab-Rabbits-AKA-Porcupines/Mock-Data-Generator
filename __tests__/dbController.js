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

// //functions

describe('dbController tests', () => {
  const req = {};
  const res = {};

  beforeAll(() => {
    //mockreq
    req.query = {
      quantity: 3,
      link: true,
      birthday: true,
      coordinates: true
    };

    //mockres
    res.locals = {
      data: []
    };
  });

  //if data empty, need to make obj + add properties
  //if data has at least 1 obj in it, just add properties

  describe('getBirthday controller tests', () => {
    const getBirthday = dbController[7];

    it('has a function getBirthday', () => {
      expect(typeof getBirthday).toBe('function');
    });

    it('res.locals has birthday property in each obj', () => {
      getBirthday(req, res);

      for (let i = 0; i < req.query.quantity; i++) {
        expect(res.locals.data[i]).toHaveProperty('birthday');
        expect(res.locals.data[i].birthday).toBeDefined();
      }
    });

    it('all birthdays in res.locals should be a string', () => {
      getBirthday(req, res);
      for (let i = 0; i < req.query.quantity; i++) {
        expect(typeof res.locals.data[i].birthday).toBe('string');
      }
    });

    it('birthday should have a year, month and day split up by /', () => {
      getBirthday(req, res);

      for (let i = 0; i < req.query.quantity; i++) {
        expect(res.locals.data[i].birthday[4]).toEqual('/');
        expect(res.locals.data[i].birthday[7]).toEqual('/');
      }
    });

    it('day in birthday should be a number between 01 and 31 and should always be 2 characters long', () => {
      for (let i = 0; i < req.query.quantity; i++) {
        const splitBirthday = res.locals.data[i].birthday.split('/');
        expect(splitBirthday[2]).toHaveLength(2);
        expect(typeof Number(splitBirthday[2])).not.toBeNaN();
        expect(Number(splitBirthday[2])).toBeLessThanOrEqual(31);
        expect(Number(splitBirthday[2])).toBeGreaterThanOrEqual(1);
      }
    });

    it('month in birthday should be a number between 01 and 12 and should always be 2 characters long', () => {
      for (let i = 0; i < req.query.quantity; i++) {
        const splitBirthday = res.locals.data[i].birthday.split('/');
        expect(splitBirthday[1]).toHaveLength(2);
        expect(typeof Number(splitBirthday[1])).not.toBeNaN();
        expect(Number(splitBirthday[1])).toBeLessThanOrEqual(12);
        expect(Number(splitBirthday[1])).toBeGreaterThanOrEqual(1);
      }
    });

    it('year in birthday should be a number between 1900 and 2023 and should always be 4 characters long', () => {
      for (let i = 0; i < req.query.quantity; i++) {
        const splitBirthday = res.locals.data[i].birthday.split('/');
        expect(splitBirthday[0]).toHaveLength(4);
        expect(splitBirthday[0]).toHaveLength(4);
        expect(typeof Number(splitBirthday[0])).not.toBeNaN();
        expect(Number(splitBirthday[0])).toBeLessThanOrEqual(2023);
        expect(Number(splitBirthday[0])).toBeGreaterThanOrEqual(1900);
      }
    });
  });

  describe('getLink controller tests', () => {
    const getLink = dbController[9];

    it('has a function getLink', () => {
      // test for function type
      expect(typeof getLink).toBe('function');
    });
    // test for return string
    it('getLink returns a string', () => {
      getLink(req, res);
      for (let i = 0; i < req.query.quantity; i++) {
        const result = res.locals.data[i].link;
        expect(typeof result).toBe('string');
      }
    });
    // test for first 7 indexes to = 'https://'
    it('getLink returned string has a valid https:// prefix', () => {
      getLink(req, res);
      for (let i = 0; i < req.query.quantity; i++) {
        const prefix = res.locals.data[i].link.slice(0, 8);
        expect(prefix).toBe('https://');
      }
    });
    // test for 8th index to be a valid character
    it('getLink has a letter for the 8th index of its returned string', () => {
      getLink(req, res);
      for (let i = 0; i < req.query.quantity; i++) {
        const eighthIndex = res.locals.data[i].link.slice(8, 9);
        function validChar(str) {
          return /^[A-Za-z0-9]*$/.test(str);
        }
        expect(validChar(eighthIndex)).toBe(true);
      }
    });
    // test for final 3 or 4 indexes to = one of suffix array elements
    it('getLink has a valid suffix', () => {
      const suffix = ['.com', '.io', '.org', '.edu', '.net', '.us'];
      getLink(req, res);
      for (let i = 0; i < req.query.quantity; i++) {
        const string4 = res.locals.data[i].link.slice(-4);
        const string3 = res.locals.data[i].link.slice(-3);
        let result = false;
        if (suffix.includes(string3) || suffix.includes(string4)) result = true;
        expect(result).toBe(true);
      }
    });
    // test for res.locals.data to be updated
    it('getLink populates res.locals.data', () => {
      getLink(req, res);
      for (let i = 0; i < req.query.quantity; i++) {
        const result = res.locals.data[i].link;
        expect(result).toBeTruthy();
      }
    });

    describe('getCoordinates tests', () => {
      const getCoordinates = dbController[8];

      it('has a function getCoordinates', () => {
        expect(typeof getCoordinates).toBe('function');
      });

      it('getCoordinates inserts a new property "coordinates" into res.locals.data and does so the right amount of times', () => {
        getCoordinates(req, res);
        let count = 0;
        res.locals.data.forEach(obj => {
          if (Object.hasOwn(obj, 'coordinates')) count++;
        });
        expect(count).toEqual(req.query.quantity);
      });

      it('getCoordinates returns a string with a comma', () => {
        getCoordinates(req, res);
        const result = res.locals.data[0].coordinates.includes(',');
        const string = res.locals.data[0].coordinates;
        expect(result).toBe(true);
        expect(typeof string).toBe('string');
      });

      it('getCoordinates has valid value for latitude', () => {
        getCoordinates(req, res);
        const resultLat = Number(res.locals.data[0].coordinates.split(',')[0]);
        console.log(resultLat);
        expect(resultLat).toBeGreaterThanOrEqual(-90);
        expect(resultLat).toBeLessThanOrEqual(90);
      });

      it('getCoordinates has valid value for longitude', () => {
        getCoordinates(req, res);
        const resultLong = Number(res.locals.data[0].coordinates.split(',')[1]);
        expect(resultLong).toBeGreaterThanOrEqual(-180);
        expect(resultLong).toBeLessThanOrEqual(180);
      });
    });
  });
});
