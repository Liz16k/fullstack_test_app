import news from '../news.js';

const getAll = async (_, res) => {
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
};

const getById = async (req, res) => {
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
};

export default { getAll, getById };
