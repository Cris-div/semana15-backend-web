const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

  try {

    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        message: 'Nombre, email y password son requeridos'
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        message: 'El email ya se encuentra registrado'
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      role: 'CUSTOMER'
    });

    res.status(201).json({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      role: user.role
    });

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
      process.env.JWT_SECRET || 'secretkey',
      {
        expiresIn: '1d'
      }
    );

    res.json({
      token,
      role: user.role,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
