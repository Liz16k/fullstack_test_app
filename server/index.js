import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import NewsController from './controllers/NewsController.js';
import UserController from './controllers/UserController.js';
import checkAuthorization from './utils/checkAuthorization.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Server was connected to DB'))
  .catch((err) => console.log('Error connecting to DB', err.message));

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
  res.send({ status: 'OK' });
});

app.get('/news', checkAuthorization, NewsController.getAll);
app.get('/news/:id', checkAuthorization, NewsController.getById);

app.post('/register', UserController.register);
app.post('/login', UserController.login);

app.listen(5000, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log('Server is started (port: 5000)');
});
