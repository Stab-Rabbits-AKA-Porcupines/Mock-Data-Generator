const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route intergration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/api', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/api')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      it('responds with specified quanties of first names when requested for first name data', () => {
        return request(server)
          .get('/api')
          .query({ quantity: 10, firstName: true })
          .then(res => {
            expect(res.body.length).toBe(10);
            for (let i = 0; i < 10; i++) {
              expect(Object.hasOwn(res.body[i], 'firstName')).toBe(true);
            }
          });
      });

      it('responds with specified quanties of middle names when requested for middle name data', () => {
        return request(server)
          .get('/api')
          .query({ quantity: 10, fullNameMiddle: true })
          .then(res => {
            expect(res.body.length).toBe(10);
            for (let i = 0; i < 10; i++) {
              expect(Object.hasOwn(res.body[i], 'middleName')).toBe(true);
            }
          });
      });

      it('responds with specified quanties of last names when requested for last name data', () => {
        return request(server)
          .get('/api')
          .query({ quantity: 10, fullName: true })
          .then(res => {
            expect(res.body.length).toBe(10);
            for (let i = 0; i < 10; i++) {
              expect(Object.hasOwn(res.body[i], 'lastName')).toBe(true);
            }
          });
      });

      it('responds with specified quanties of emails when requested for email data', () => {
        return request(server)
          .get('/api')
          .query({ quantity: 10, email: true })
          .then(res => {
            expect(res.body.length).toBe(10);
            for (let i = 0; i < 10; i++) {
              expect(Object.hasOwn(res.body[i], 'email')).toBe(true);
            }
          });
      });

      it('responds with specified quanties of phone numbers when requested for phone number data', () => {
        return request(server)
          .get('/api')
          .query({ quantity: 10, phoneNumber: true })
          .then(res => {
            expect(res.body.length).toBe(10);
            for (let i = 0; i < 10; i++) {
              expect(Object.hasOwn(res.body[i], 'phoneNumber')).toBe(true);
            }
          });
      });

      it('responds with specified quanties of countries when requested for country data', () => {
        return request(server)
          .get('/api')
          .query({ quantity: 10, country: true })
          .then(res => {
            expect(res.body.length).toBe(10);
            for (let i = 0; i < 10; i++) {
              expect(Object.hasOwn(res.body[i], 'country')).toBe(true);
            }
          });
      });

      it('responds with specified quanties of birthdays when requested for birthday data', () => {
        return request(server)
          .get('/api')
          .query({ quantity: 10, birthday: true })
          .then(res => {
            expect(res.body.length).toBe(10);
            for (let i = 0; i < 10; i++) {
              expect(Object.hasOwn(res.body[i], 'birthday')).toBe(true);
            }
          });
      });

      it('responds with specified quanties of urls when requested for urls data', () => {
        return request(server)
          .get('/api')
          .query({ quantity: 10, URLs: true })
          .then(res => {
            expect(res.body.length).toBe(10);
            for (let i = 0; i < 10; i++) {
              expect(Object.hasOwn(res.body[i], 'link')).toBe(true);
            }
          });
      });

      it('responds with specified quanties of coordinates when requested for coordinates data', () => {
        return request(server)
          .get('/api')
          .query({ quantity: 10, coordinates: true })
          .then(res => {
            expect(res.body.length).toBe(10);
            for (let i = 0; i < 10; i++) {
              expect(Object.hasOwn(res.body[i], 'coordinates')).toBe(true);
            }
          });
      });

      // this test relys on the last function in the dbController to pass in the err object in next function
      it('responds to invalid request with an error message in the body', () => {
        return request(server)
          .get('/api')
          .query({ sdfsf: true })
          .expect('Content-Type', /application\/json/)
          .then(res => {
            expect(res.body).toBe('Please select an option from the dropdown');
          });
      });
    });
  });
});
