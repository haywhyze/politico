import chai from 'chai';
import { describe, it, before } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import dropTables from '../models/dropTables';
import createTables from '../models/createTables';
import seedDb from '../models/seed/seedDb';
import 'idempotent-babel-polyfill';

const { expect } = chai;

chai.use(chaiHttp);

describe('Parties Route', () => {
  let tokenAdmin;

  before(async () => {
    await dropTables();
    await createTables();
    await seedDb();
    const result = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'haywhyze@hotmail.com',
        password: process.env.ADMIN_PASSWORD,
      });
    tokenAdmin = result.body.data[0].token;
  });

  describe('POST /parties - Create Party', () => {
    it('should not create when user is not logged in', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/parties')
        .type('form')
        .field('name', 'All Progressives Congress')
        .field('hqAddress', 'APC National Secretariat')
        .attach('logoUrl', './UI/img/img_3.jpg', 'img_3.jpg');
      expect(res.status).to.equal(401);
      expect(res.body.error).to.be.a('string');
    });
    it('should not create when user provides invalid token', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/parties')
        .set('x-access-token', 'justarandomstring')
        .type('form')
        .field('name', 'All Progressives Congress')
        .field('hqAddress', 'APC National Secretariat')
        .attach('logoUrl', './UI/img/img_3.jpg', 'img_3.jpg');
      expect(res.status).to.equal(401);
      expect(res.body.error).to.be.a('string');
    });
    it('should create when user is an admin', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/parties')
        .set('x-access-token', tokenAdmin)
        .type('form')
        .field('name', 'All Progressives Jongress')
        .field('hqAddress', 'APC National Secretariat')
        .attach('logoUrl', './UI/img/img_3.jpg', 'img_3.jpg');
      expect(res.status).to.equal(201);
    });
    it('should not create a new party if  name is empty', done => {
      chai
        .request(app)
        .post('/api/v1/parties')
        .set('x-access-token', tokenAdmin)
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
        .set('x-access-token', tokenAdmin)
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
        .set('x-access-token', tokenAdmin)
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
        .set('x-access-token', tokenAdmin)
        .type('form')
        .field('name', 'All Progressives Congress')
        .field('hqAddress', '')
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
        .set('x-access-token', tokenAdmin)
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
        .set('x-access-token', tokenAdmin)
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
    it('should return 401 on users not logged in', async () => {
      const res = await chai.request(app).get('/api/v1/parties');
      expect(res.status).to.equal(401);
    });
    it('should return 400 for invalid token', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/parties')
        .set('x-access-token', 'justarandomddadd');
      expect(res.status).to.equal(401);
    });
    it('should get all red-flags for logged in user', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/parties')
        .set('x-access-token', tokenAdmin);
      expect(res.status).to.equal(200);
    });
  });

  describe('GET /api/v1/parties/:id', () => {
    it('should send a 400 error if ID is not valid', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/parties/1yut')
        .set('x-access-token', tokenAdmin);
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
    });
    it('should send a 404 error if ID does not exist', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/parties/15')
        .set('x-access-token', tokenAdmin);
      expect(res.status).to.equal(404);
      expect(res.body.error).to.be.a('string');
    });
    it('should get a specific red-flag if ID exist', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/parties/1')
        .set('x-access-token', tokenAdmin);
      expect(res.status).to.equal(200);
    });
  });
  describe('PATCH api/v1/parties/<party-id>/name', () => {
    it('should not change the name of the specified party if token is invalid', done => {
      chai
        .request(app)
        .patch('/api/v1/parties/1/name')
        .set('x-access-token', 'tokenAdmin')
        .send({
          name: 'Action Congress of Nigeria',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should change the name of the specified party if party id and new name value is valid', done => {
      chai
        .request(app)
        .patch('/api/v1/parties/1/name')
        .set('x-access-token', tokenAdmin)
        .send({
          name: 'Action Congress of Nigeria',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data[0].name).to.equal('Action Congress of Nigeria');
          done();
        });
    });

    it('should not change the name if name field is missing or empty', done => {
      chai
        .request(app)
        .patch('/api/v1/parties/1/name')
        .set('x-access-token', tokenAdmin)
        .send({
          name: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

    it('should not change the name if name value is invalid', done => {
      chai
        .request(app)
        .patch('/api/v1/parties/1/name')
        .set('x-access-token', tokenAdmin)
        .send({
          name: '1987 yugyuh 7878',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

    it('should not change the name if party ID does not exist, 404', done => {
      chai
        .request(app)
        .patch('/api/v1/parties/12/name')
        .set('x-access-token', tokenAdmin)
        .send({
          name: 'Action Congress of Nigeria',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

    it('should not change the name if party ID value is invalid, 400', done => {
      chai
        .request(app)
        .patch('/api/v1/parties/shade/name')
        .set('x-access-token', tokenAdmin)
        .send({
          name: 'Action Congress of Nigeria',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
  });

  describe('DELETE /api/v1/parties/<party-id>', () => {
    it('should not delete if token is not provided', done => {
      chai
        .request(app)
        .delete('/api/v1/parties/1')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should delete party record if party ID exist and user signed in', done => {
      chai
        .request(app)
        .delete('/api/v1/parties/1')
        .set('x-access-token', tokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data[0].message).to.be.a('string');
          done();
        });
    });
    it('should not delete record if party ID does not exist, 404', done => {
      chai
        .request(app)
        .delete('/api/v1/parties/12')
        .set('x-access-token', tokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
    it('should not delete record if party ID value is invalid, 400', done => {
      chai
        .request(app)
        .delete('/api/v1/parties/shade')
        .set('x-access-token', tokenAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('string');
          done();
        });
    });
  });
});
