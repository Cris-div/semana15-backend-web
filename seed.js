require('dotenv').config();

const sequelize = require('./src/config/database');
const Product = require('./src/models/Product');

async function seed() {
  try {
    console.log('Conectando a la base de datos...');

    await sequelize.authenticate();

    console.log('Conexión exitosa');

    await Product.bulkCreate([
      {
        nombre: 'Laptop Lenovo ThinkPad',
        precio: 3500.00,
        descripcion: 'Laptop empresarial de alto rendimiento'
      },
      {
        nombre: 'Smartphone Samsung Galaxy S24',
        precio: 2899.90,
        descripcion: 'Teléfono inteligente de última generación'
      },
      {
        nombre: 'Monitor LG 27"',
        precio: 899.90,
        descripcion: 'Monitor Full HD para oficina y gaming'
      },
      {
        nombre: 'Teclado Mecánico Redragon',
        precio: 199.90,
        descripcion: 'Teclado mecánico RGB'
      },
      {
        nombre: 'Mouse Logitech G502',
        precio: 249.90,
        descripcion: 'Mouse gamer de alta precisión'
      }
    ]);

    console.log('Datos insertados correctamente');
    process.exit(0);

  } catch (error) {
    console.error('Error al insertar datos:', error);
    process.exit(1);
  }
}

seed();