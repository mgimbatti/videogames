const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('Datatypes', () => {
      it('should throw an error if Datatype is incorrect', (done) => {
        Videogame.create({
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Super Mario',
          platforms: ["PC", "PlayStation V"],
          description: 'A great game',
          released: 'February'
        })
          .then(() => done(new Error('It requires a valid date')))
          .catch(() => done());
      });
    })
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });
    });  
  });
})
