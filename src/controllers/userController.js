const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { findUserByEmail, addUserToDb } = require('../model/userModel');

const userRegistration = async (req, res) => {
  try {
    const gautasEmail = req.body.email;
    const { nickname, password } = req.body;
    const plainTextPassword = password;

    const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);

    // tikrinam ar yra toks email jau uzregintas
    const foundUser = await findUserByEmail(gautasEmail);

    // jei yra toks email
    if (foundUser) {
      res.status(400).json(`User with ${gautasEmail} e-mail already exists.`);
      return;
    }

    const newUser = {
      nickname,
      email: gautasEmail,
      password: hashedPassword,
    };

    // kviesti modelio funkcija kuri sukuria varototoja
    const insertResult = await addUserToDb(newUser.nickname, newUser.email, newUser.password);

    if (insertResult === false) {
      res.status(500).json('Something went wrong.');
      return;
    }
    res.status(201).json('User succesfully created!');
  } catch (error) {
    console.log(error);
    res.status(500).json('User not created.');
  }
};

const userLogin = async (req, res) => {
  const gautasEmail = req.body.email;
  const gautasPassword = req.body.password;

  // tikrinam ar yra toks email jau uzregintas
  const foundUser = await findUserByEmail(gautasEmail);

  // jei nera tokio email
  if (!foundUser) {
    res.status(400).json('Please enter a valid email address and password.');
    return;
  }
  // jei yra toks email, tikrinam ar sutampa su slaptazodziu
  if (!bcrypt.compareSync(gautasPassword, foundUser.password)) {
    res.status(400).json('Please enter a valid email address and password.');
    return;
  }
  // generuojam jwt token
  const payload = { userId: foundUser.id };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '3h' });
  res.json({ success: true, token });
};

module.exports = { userRegistration, userLogin };
