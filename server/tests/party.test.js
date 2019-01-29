import chai from 'chai';
import { describe, it, beforeEach } from 'mocha';
import chaiHttp from 'chai-http';
import partiesData from '../models/parties';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

const partiesDataLength = partiesData.length;

describe('Parties', () => {
  beforeEach(done => {
    // check if test has added to the data structure records
    // if true, return to original state.
    if (partiesDataLength > 1) {
      partiesData.splice(1, partiesData.length - 1);
    }
    // check if test has deleted the initial seeded data
    // if true, re-seed.
    else if (partiesData.length === 0) {
      partiesData.push({
        id: 1,
        name: 'Peoples Democratic Party',
        hqAddress: 'Plot 1970 Michael Okpara St, Wuse, Abuja',
        logoUrl:
          'http://res.cloudinary.com/haywhyze/image/upload/v1548329998/pdwafyuw0uqo1nlzejde.jpg',
      });
    }
    done();
  });

  describe('POST /api/v1/parties', () => {
    it('should create a new party if all field are filled appropriately', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .type('form')
        .field('name', 'All Progressives Congress')
        .field('hqAddress', 'APC National Secretariat')
        .attach('logoUrl', './UI/img/img_3.jpg', 'img_3.jpg')
        .then(res => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('should not create a new party if  name is empty', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .type('form')
        .field('name', '')
        .field('hqAddress', 'APC National Secretariat')
        .attach('logoUrl', './UI/img/img_3.jpg', 'img_3.jpg')
        .then(res => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not create a new party if hqAddress is empty', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .type('form')
        .field('name', 'All Progressives Congress')
        .field('hqAddress', '')
        .attach('logoUrl', './UI/img/img_3.jpg', 'img_3.jpg')
        .then(res => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not create a new party if logoUrl is empty', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .type('form')
        .field('name', 'All Progressives Congress')
        .field('hqAddress', 'APC National Secretariat')
        .attach('logoUrl', '', '')
        .then(res => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not create a new party if hqAddress is invalid', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .type('form')
        .field('name', 'All Progressives Congress')
        .field('hqAddress', 'Just me trying out stuff')
        .attach('logoUrl', './UI/img/img_3.jpg', 'img_3.jpg')
        .then(res => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not create a new party if name is too short', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .type('form')
        .field('name', 'All')
        .field('hqAddress', 'APC National Secretariat')
        .attach('logoUrl', './UI/img/img_3.jpg', 'img_3.jpg')
        .then(res => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not create a new party if logoUrl is not valid', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .type('form')
        .field('name', 'All Progressives Congress')
        .field('hqAddress', 'APC National Secretariat')
        .attach('logoUrl', './UI/index.html', 'index.html')
        .then(res => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('GET /api/v1/parties', () => {
    it('should get all parties if records exist', done => {
      chai
        .request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('should return empty array if there are no party records to display', done => {
      partiesData.splice(0, partiesData.length);
      chai
        .request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.eql([]);
          done();
        });
    });
  });

  describe('GET /api/v1/parties/<party-id>', () => {
    it('should get a specific party if ID exist', done => {
      chai
        .request(app)
        .get('/api/v1/parties/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data[0].id).to.equal(1);
          expect(res.body.data[0].name).to.be.a('string');
          done();
        });
    });

    it('should send a 404 error if ID does not exist', done => {
      chai
        .request(app)
        .get('/api/v1/parties/15')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('party ID provided does not exist');
          done();
        });
    });

    it('should send a 400 error if ID is not valid', done => {
      chai
        .request(app)
        .get('/api/v1/parties/1yut')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('party ID value provided is not valid');
          done();
        });
    });
  });
});
