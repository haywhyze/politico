import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes';

dotenv.load();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to politico',
  });
});

app.get('/', (req, res) =>
  res.status(200).send({
    message: 'Welcome to politico',
  }),
);

app.use('/api/v1/', router);

app.listen(3000);
/* eslint-disable-next-line no-console */
console.log('app running on port ', 3000);

export default app;
