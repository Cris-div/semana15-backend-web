require('dotenv').config();

const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const sequelize = require('./src/config/database');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
const User = require('./src/models/User');

Category.hasMany(Product, {
  foreignKey: 'categoryId'
});

Product.belongsTo(Category, {
  foreignKey: 'categoryId'
});

async function seed() {
  try {
    console.log('Conectando a la base de datos...');

    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log('Conexion exitosa');

    const password = await bcrypt.hash('Password123', 10);

    await User.findOrCreate({
      where: { email: 'customer@test.com' },
      defaults: {
        nombre: 'Cliente Demo',
        email: 'customer@test.com',
        password,
        role: 'CUSTOMER'
      }
    });

    await User.findOrCreate({
      where: { email: 'admin@test.com' },
      defaults: {
        nombre: 'Admin Demo',
        email: 'admin@test.com',
        password,
        role: 'ADMIN'
      }
    });

    const [laptops] = await Category.findOrCreate({
      where: { nombre: 'Laptops' }
    });

    const [smartphones] = await Category.findOrCreate({
      where: { nombre: 'Smartphones' }
    });

    const [accesorios] = await Category.findOrCreate({
      where: { nombre: 'Accesorios' }
    });

    const products = [
      {
        aliases: ['Laptop Lenovo ThinkPad'],
        nombre: 'Laptop Lenovo ThinkPad',
        precio: 3500.00,
        descripcion: 'Laptop empresarial de alto rendimiento',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
        categoryId: laptops.id
      },
      {
        aliases: ['Smartphone Samsung Galaxy S24'],
        nombre: 'Smartphone Samsung Galaxy S24',
        precio: 2899.90,
        descripcion: 'Telefono inteligente de ultima generacion',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
        categoryId: smartphones.id
      },
      {
        aliases: ['Monitor LG 27"'],
        nombre: 'Monitor LG 27"',
        precio: 899.90,
        descripcion: 'Monitor Full HD para oficina y gaming',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
        categoryId: accesorios.id
      },
      {
        aliases: ['Teclado Mecanico Redragon', 'Teclado Mecánico Redragon'],
        nombre: 'Teclado Mecanico Redragon',
        precio: 199.90,
        descripcion: 'Teclado mecanico RGB',
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
        categoryId: accesorios.id
      },
      {
        aliases: ['Mouse Logitech G502'],
        nombre: 'Mouse Logitech G502',
        precio: 249.90,
        descripcion: 'Mouse gamer de alta precision',
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
        categoryId: accesorios.id
      }
    ];

    for (const product of products) {
      const { aliases, ...productData } = product;
      const existingProducts = await Product.findAll({
        where: {
          nombre: {
            [Op.in]: aliases
          }
        }
      });

      if (existingProducts.length > 0) {
        for (const existingProduct of existingProducts) {
          await existingProduct.update(productData);
        }
      } else {
        await Product.create(productData);
      }
    }

    console.log('Datos insertados correctamente');
    console.log('CUSTOMER: customer@test.com / Password123');
    console.log('ADMIN: admin@test.com / Password123');
    process.exit(0);
  } catch (error) {
    console.error('Error al insertar datos:', error);
    process.exit(1);
  }
}

seed();
