import express from 'express';
import news from './news.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import UserModel from './models/User.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Server was connected to DB'))
  .catch((err) => console.log('Error connecting to DB', err.message));

const app = express();
app.use(express.json());

app.get('/', (_, res) => {
  res.send({ status: 'OK' });
});

app.get('/news', async (_, res) => {
  try {
    const lastNews = await new Promise((res, rej) => {
      setTimeout(() => {
        res(news);
      }, 1000);
    });
    res.json(lastNews);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'Failed to receive news',
    });
  }
});

app.get('/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id < 0 || id >= news.length) {
      res.status(500).json({
        message: 'Failed to receive news',
      });
    }

    const lastNews = await new Promise((res) => {
      setTimeout(() => {
        res(news[id]);
      }, 1000);
    });
    res.json(lastNews);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'Failed to receive news',
    });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { password, email, fullName } = req.body;

    if(await UserModel.findOne({ email })) {
      return res.status(409).json({
        message: 'User with such email already exists',
      });
    }

    const doc = new UserModel({
      fullName,
      email,
      password,
    });

    const user = await doc.save();

    const { password: _, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'Failed to register',
    });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'User is not found',
      });
    }

    const realPassword = user.password;
    const isValidPassword = realPassword === password;

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Wrong login or password',
      });
    }

    const { password: _, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'Failed to login',
    });
  }
});

app.listen(5000, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log('Server is started (port: 5000)');
});
