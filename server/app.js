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

app.all('*', (req, res) => {
  res
    .status(404)
    .send(
      '<h2>Well!!! This is Embarrasing</h2><p>There are no resources here. Check the documentation here for valid routes</p>',
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;
