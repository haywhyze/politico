import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
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

app.use(
  cors({
    credentials: true,
    method: ['GET', 'POST', 'PATCH', 'DELETE'],
  }),
);

app.use(express.static('./UI'));

app.use('/docs', express.static('./docs'));

app.use('/api/v1/', router);

app.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'The resource you are looking for does not exist',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;
