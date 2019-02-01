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
    console.log(result.body.data[0].token);

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
});
