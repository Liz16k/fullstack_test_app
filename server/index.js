import express from 'express';
import news from './news.js';

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
    console.log(err);
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

    //check by id in db

    const lastNews = await new Promise((res) => {
      setTimeout(() => {
        res(news[id]);
      }, 1000);
    });
    res.json(lastNews);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to receive news',
    });
  }
});

app.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const { password, email, fullName } = req.body;

    //create and save to db

    res.json({ message: 'You have been successfully registered'});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to register',
    });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = { password: '', fullName: '', email: '' };

    //find usser, check password

    if (!user) {
      return res.status(404).json({
        message: 'User is not found',
      });
    }

    const isValidPassword = true;

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Wrong login or password',
      });
    }

    res.json({ message: 'You have successfully logged in' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to login',
    });
  }
});

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server is started (port: 5000)');
});
