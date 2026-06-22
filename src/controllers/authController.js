const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

  try {

    const { nombre, email, password } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      role: 'CUSTOMER'
    });

    res.status(201).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ where: { email } });

    if (!user) {

      return res.status(401).json({
        message: 'Usuario no encontrado'
      });

    }

    const valid =
      await bcrypt.compare(password, user.password);

    if (!valid) {

      return res.status(401).json({
        message: 'Contraseña incorrecta'
      });

    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      'secretkey',
      {
        expiresIn: '1d'
      }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};