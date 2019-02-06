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

let tokenAdmin;
describe('Authenticate User', () => {
  before(async () => {
    await dropTables();
    await createTables();
    await seedDb();
  });

  describe('Sign Up user endpoint', () => {
    it('should create user if all input are provided correctly', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', 'Ayobami Daniels')
        .field('email', 'yusufolaitan@yusuf.com')
        .field('password', '0123456789')
        .field('confirmPassword', '0123456789')
        .field('phoneNumber', '07085033470')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(201);
      expect(res.body.data[0].token).to.be.a('string');
      expect(res.body.data[0].user).to.be.an('object');
    });

    it('should not create if user already exists', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', 'Ayobami Daniels')
        .field('email', 'yusufolaitan@yusuf.com')
        .field('password', '0123456789')
        .field('confirmPassword', '0123456789')
        .field('phoneNumber', '07085033470')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(409);
      expect(res.body.error).to.be.a('string');
    });

    it('should not create if fullname is not provided', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', '')
        .field('email', 'yusuf@yusuf.com')
        .field('password', '0123456789')
        .field('confirmPassword', '0123456789')
        .field('phoneNumber', '07085033470')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
    });

    it('should not create if last name is provided', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', 'Ayobami')
        .field('email', 'yusuf@yusuf.com')
        .field('password', '0123456789')
        .field('confirmPassword', '0123456789')
        .field('phoneNumber', '07085033470')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
    });

    it('should not create if name provided is invalid', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', '3344553343 [][090909]')
        .field('email', 'yusuf@yusuf.com')
        .field('password', '0123456789')
        .field('confirmPassword', '0123456789')
        .field('phoneNumber', '07085033470')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.an('array');
    });

    it('should not create if email is not provided', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', 'Ayobami Daniels')
        .field('email', '')
        .field('password', '0123456789')
        .field('confirmPassword', '0123456789')
        .field('phoneNumber', '07085033470')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
    });

    it('should not create if email is invalid', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', 'Ayobami Daniels')
        .field('email', 'yusufyusufcom')
        .field('password', '0123456789')
        .field('confirmPassword', '0123456789')
        .field('phoneNumber', '07085033470')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.an('array');
    });

    it('should not create if password does not match', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', 'Ayobami Daniels')
        .field('email', 'yusuf@yusuf.com')
        .field('password', '0123456789')
        .field('confirmPassword', '01234ii5678')
        .field('phoneNumber', '07085033470')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.an('array');
    });

    it('should not create if password is too short', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', 'Ayobami Daniels')
        .field('email', 'yusuf@yusuf.com')
        .field('password', '012')
        .field('confirmPassword', '012')
        .field('phoneNumber', '07085033470')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.an('array');
    });

    it('should not create if password is not provided', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', 'Ayobami Daniels')
        .field('email', 'yusuf@yusuf.com')
        .field('password', '')
        .field('confirmPassword', '')
        .field('phoneNumber', '07085033470')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
    });

    it('should not create if phone number is not provided', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', 'Ayobami Daniels')
        .field('email', 'yusuf@yusuf.com')
        .field('password', '0123456789')
        .field('confirmPassword', '0123456789')
        .field('phoneNumber', '')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
    });

    it('should not create if phone number is invalid', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .field('fullname', 'Ayobami Daniels')
        .field('email', 'yusuf@yusuf.com')
        .field('password', '0123456789')
        .field('confirmPassword', '0123456789')
        .field('phoneNumber', '033470')
        .attach('passportUrl', './UI/img/buhari.jpg');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.an('array');
    });
  });

  describe('Sign In user end-point', () => {
    it('should login user if provided with right values', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'haywhyze@hotmail.com',
          password: 'adminpassword',
        });
      expect(res.status).to.eql(200);
      expect(res.body.data[0].user).to.be.an('object');
      tokenAdmin = res.body.data[0].token;
    });
    it('should not login user if email is not provided', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: '',
          password: 'haywhyze',
        });
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
    });
    it('should not login user with unregistered email', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'haywhyze@google.com',
          password: '(adminPASSWORD2018)',
        });
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
    });
    it('should not login user with wrong password', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'haywhyze@hotmail.com',
          password: '(admingfgfgf',
        });
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
    });
  });
});
