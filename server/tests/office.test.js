import chai from 'chai';
import { describe, it, beforeEach } from 'mocha';
import chaiHttp from 'chai-http';
import officesData from '../models/offices';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const officesDataLength = officesData.length;

describe('Offices', () => {
  beforeEach(done => {
    // check if test has added to the data structure records
    // if true, return to original state.
    if (officesDataLength > 1) {
      officesData.splice(1, officesData.length - 1);
    }
    // check if test has deleted the initial seeded data
    // if true, re-seed.
    else if (officesData.length === 0) {
      officesData.push({
        id: 1,
        type: 'federal',
        name: 'President',
      });
    }
    done();
  });

  describe('POST /api/v1/offices', () => {
    it('should create a new office if all required field are provided appropriately', done => {
      chai
        .request(app)
        .post('/api/v1/offices')
        .send({
          name: 'Governor',
          type: 'state',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('should not create an office if name value is invalid', done => {
      chai
        .request(app)
        .post('/api/v1/offices')
        .send({
          name: 'Governor90',
          type: 'state',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

    it('should not create an office if type value is invalid', done => {
      chai
        .request(app)
        .post('/api/v1/offices')
        .send({
          name: 'Governor',
          type: 'stateoforigin',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

    it('should not create an office if name value is not provided', done => {
      chai
        .request(app)
        .post('/api/v1/offices')
        .send({
          type: 'state',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

    it('should not create an office if type value is not provided', done => {
      chai
        .request(app)
        .post('/api/v1/offices')
        .send({
          name: 'Governor',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
  });

  describe('GET /api/v1/offices', () => {
    it('should get all offices if records exist', done => {
      chai
        .request(app)
        .get('/api/v1/offices')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('should return empty array if there are no office records to display', done => {
      officesData.splice(0, officesData.length);
      chai
        .request(app)
        .get('/api/v1/offices')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.eql([]);
          done();
        });
    });
  });

  describe('GET /api/v1/offices/<office-id>', () => {
    it('should get a specific office if ID exist', done => {
      chai
        .request(app)
        .get('/api/v1/offices/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data[0].id).to.equal(1);
          done();
        });
    });

    it('should send a 404 error if ID does not exist', done => {
      chai
        .request(app)
        .get('/api/v1/offices/15')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('office ID provided does not exist');
          done();
        });
    });

    it('should send a 400 error if ID is not valid', done => {
      chai
        .request(app)
        .get('/api/v1/offices/1yut')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('office ID value provided is not valid');
          done();
        });
    });
  });
});
