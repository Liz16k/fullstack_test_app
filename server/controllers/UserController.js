import UserModel from '../models/User.js';

const register = async (req, res) => {
  try {
    const { password, email, fullName } = req.body;

    if (await UserModel.findOne({ email })) {
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
};

const login = async (req, res) => {
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
};

export default { register, login };
