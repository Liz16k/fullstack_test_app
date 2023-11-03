import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';

const register = async (req, res) => {
  try {
    const { password, email, fullName } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    if (await UserModel.findOne({ email })) {
      return res.status(409).json({
        message: 'User with such email already exists',
      });
    }

    const doc = new UserModel({
      fullName,
      email,
      passwordHash: hash,
    });

    const user = await doc.save();

    const { passwordHash, ...userData } = user._doc;
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

    const isValidPassword = await bcrypt.compare(password, user._doc.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Wrong login or password',
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWTkey, { expiresIn: '1h' });

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'Failed to login',
    });
  }
};

export default { register, login };
