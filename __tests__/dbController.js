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
 
    const req = {
      query: {
        quantity: 3,
        birthday: true,
        coordinates: true
      }
    };

    //mockres
    const res = {
      locals: {
        data: []
      }
    };


  //if data empty, need to make obj + add properties
  //if data has at least 1 obj in it, just add properties

  xit('has a function getBirthday', () => {
    const getBirthday = dbController[7];
    console.log(dbController[0].prototype);
    expect(dbController.find()).toBe(makeArray);
    // expect(dbController.includes(makeArray)).toBe(true);
    expect(typeof dbController[0]).toBe('function');
  });

  const getCoordinatesIndex = 7;

  it('has a function getCoordinates', () => {
    expect(typeof dbController[getCoordinatesIndex]).toBe('function');
  });

  it('getCoordinates returns a string with a comma', () => {
    dbController[getCoordinatesIndex](req, res);
    const result = res.locals.data[0].coordinates.includes(',');
    const string = res.locals.data[0].coordinates;
    expect(result).toBe(true);
    expect(typeof string).toBe('string');
  });

  it('getCoordinates has valid value for latitude', () => {
    dbController[getCoordinatesIndex](req, res);
    const resultLat = Number(res.locals.data[0].coordinates.split(',')[0]);
    console.log(resultLat);
    expect(resultLat).toBeGreaterThanOrEqual(-90);
    expect(resultLat).toBeLessThanOrEqual(90);
  });

  it('getCoordinates has valid value for longitude', () => {
    dbController[getCoordinatesIndex](req, res);
    const resultLong = Number(res.locals.data[0].coordinates.split(',')[1]);
    expect(resultLong).toBeGreaterThanOrEqual(-180);
    expect(resultLong).toBeLessThanOrEqual(180);
  });
});
