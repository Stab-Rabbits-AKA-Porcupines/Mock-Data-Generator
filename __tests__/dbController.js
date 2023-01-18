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
  beforeAll(() => {
    //mockreq
    const req = {
      query: {
        quantity: 3,
        birthday: true
      }
    };

    //mockres
    const res = {
      locals: {
        data: []
      }
    };
  });

  //if data empty, need to make obj + add properties
  //if data has at least 1 obj in it, just add properties

  it('has a function getBirthday', () => {
    const getBirthday = dbController[7];
    console.log(dbController[0].prototype);
    expect(dbController.find()).toBe(makeArray);
    // expect(dbController.includes(makeArray)).toBe(true);
    expect(typeof dbController[0]).toBe('function');
  });
});
