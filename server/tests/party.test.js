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
        .send({
          name: 'All Progressives Congress',
          hqAddress: 'APC National Secretariat',
          logoUrl: '../UI/img/apc.jfif',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('should not create a new party if  name is empty', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .send({
          name: '',
          hqAddress: 'APC National Secretariat',
          logoUrl: '../UI/img/apc.jfif',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not create a new party if hqAddress is empty', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .send({
          name: 'All Progressives Congress',
          hqAddress: '',
          logoUrl: '../UI/img/apc.jfif',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not create a new party if logoUrl is empty', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .send({
          name: 'All Progressives Congress',
          hqAddress: 'APC National Secretariat',
          logoUrl: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not create a new party if hqAddress is invalid', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .send({
          name: 'All Progressives Congress',
          hqAddress: 'outside my compound',
          logoUrl: '../UI/img/apc.jfif',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not create a new party if name is too short', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .send({
          name: 'All',
          hqAddress: 'outside my compound',
          logoUrl: '../UI/img/apc.jfif',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not create a new party if logoUrl is not valid', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .send({
          name: 'All',
          hqAddress: 'outside my compound',
          logoUrl: '../UI/img/apc.jfif',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});
