import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import { createError } from '../utils/errors.js';

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password);

    const newUser = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin,
    });

    await newUser.save();
    res.status(201).send('New user has been created');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, 'User not found!'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, 'Wrong password or username!'));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    if (user.isAdmin === true) {
      res
        .cookie('admin', token, { httpOnly: true })
        .status(200)
        .json({ ...otherDetails });
    } else {
      res
        .cookie('client', token, { httpOnly: true })
        .status(200)
        .json({ ...otherDetails });
    }
  } catch (error) {
    next(error);
  }
};

export const logoutClient = async (req, res, next) => {
  res
    .cookie('client', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    })
    .send('deconecté client');
};
export const logoutAdmin = async (req, res, next) => {
  res
    .cookie('admin', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    })
    .send('deconnecté admin');
};

export const loggedInClient = async (req, res, next) => {
  try {
    const token = req.cookies.client;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SEC);

    res.send(true);
  } catch (err) {
    next(err);
  }
};

export const loggedInAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.admin;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SEC);

    res.send(true);
  } catch (error) {
    next(error);
  }
};
