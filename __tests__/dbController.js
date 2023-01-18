const dbController = require('../server/controllers/dbController.js');

describe('dbController tests', () => {
  it('has a function makeArray', () => {
    console.log(dbController[0]);
    console.log(dbController[0].prototype);
    expect(dbController[0].name).toBe(makeArray);
    // expect(dbController.includes(makeArray)).toBe(true);
    expect(typeof dbController[0]).toBe('function');
  });
});

// describe("", () => {
//     it("test", () => {
//       const somethingThatReturnsAFunction = () => () => {};
//       const theResult = somethingThatReturnsAFunction();
//       expect(typeof theResult).toBe("function");
//     });
//   });
